import os
import sys
import unittest
from unittest.mock import patch, MagicMock
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from fastapi import HTTPException
from services.ai_services import (
    generate_chat_response,
    generate_ai_insight,
    get_api_key,
    get_gemini_model,
    _extract_response_text
)
from google.api_core import exceptions as google_exceptions
from google.auth import exceptions as auth_exceptions


class TestChatBotBackend(unittest.TestCase):

    def test_01_empty_message_validation(self):
        """Test that empty or whitespace messages raise HTTPException 400."""
        with self.assertRaises(HTTPException) as ctx:
            generate_chat_response("")
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("empty", ctx.exception.detail.lower())

        with self.assertRaises(HTTPException) as ctx:
            generate_chat_response("   \n\t  ")
        self.assertEqual(ctx.exception.status_code, 400)

    def test_02_missing_api_key(self):
        """Test that missing GEMINI_API_KEY raises HTTPException 503."""
        with patch.dict(os.environ, {"GEMINI_API_KEY": "", "GOOGLE_API_KEY": ""}, clear=True):
            with self.assertRaises(HTTPException) as ctx:
                generate_chat_response("Hello")
            self.assertEqual(ctx.exception.status_code, 503)
            self.assertIn("not configured", ctx.exception.detail.lower())

    def test_03_invalid_api_key(self):
        """Test that invalid API key is caught and returns 400/401."""
        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.side_effect = google_exceptions.InvalidArgument("API key not valid")
            mock_model_getter.return_value = mock_model

            with self.assertRaises(HTTPException) as ctx:
                generate_chat_response("Hello")
            self.assertEqual(ctx.exception.status_code, 400)
            self.assertIn("invalid", ctx.exception.detail.lower())

    def test_04_quota_exhaustion_rate_limiting(self):
        """Test that Gemini quota limit (ResourceExhausted) raises HTTPException 429."""
        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.side_effect = google_exceptions.ResourceExhausted("Quota exceeded")
            mock_model_getter.return_value = mock_model

            with self.assertRaises(HTTPException) as ctx:
                generate_chat_response("How to recycle glass?")
            self.assertEqual(ctx.exception.status_code, 429)
            self.assertIn("quota", ctx.exception.detail.lower())

    def test_05_request_timeout(self):
        """Test that Gemini request timeout (DeadlineExceeded) raises HTTPException 504."""
        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.side_effect = google_exceptions.DeadlineExceeded("Deadline exceeded")
            mock_model_getter.return_value = mock_model

            with self.assertRaises(HTTPException) as ctx:
                generate_chat_response("How to compost?")
            self.assertEqual(ctx.exception.status_code, 504)
            self.assertIn("timed out", ctx.exception.detail.lower())

    def test_06_invalid_model_name(self):
        """Test that invalid/missing model (NotFound) raises HTTPException 404."""
        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.side_effect = google_exceptions.NotFound("Model not found")
            mock_model_getter.return_value = mock_model

            with self.assertRaises(HTTPException) as ctx:
                generate_chat_response("Hello")
            self.assertEqual(ctx.exception.status_code, 404)
            self.assertIn("not found", ctx.exception.detail.lower())

    def test_07_safety_filter_blocked_response(self):
        """Test that safety filtered responses are handled gracefully."""
        mock_response = MagicMock()
        mock_candidate = MagicMock()
        mock_candidate.finish_reason = "SAFETY"
        mock_response.candidates = [mock_candidate]
        # Text access raises ValueError when candidate is blocked
        type(mock_response).text = property(fget=MagicMock(side_effect=ValueError("Blocked by safety")))

        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.return_value = mock_response
            mock_model_getter.return_value = mock_model

            with self.assertRaises(HTTPException) as ctx:
                generate_chat_response("Harmful query")
            self.assertEqual(ctx.exception.status_code, 400)
            self.assertIn("safety", ctx.exception.detail.lower())

    def test_08_successful_chat_mocked(self):
        """Test successful chat generation with mock response."""
        mock_response = MagicMock()
        mock_response.text = "Cardboard should be clean and dry before recycling."

        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.return_value = mock_response
            mock_model_getter.return_value = mock_model

            result = generate_chat_response("Can I recycle cardboard?")
            self.assertIn("reply", result)
            self.assertEqual(result["reply"], "Cardboard should be clean and dry before recycling.")

    def test_09_real_gemini_api_call(self):
        """Test live Gemini call with active credentials if available."""
        key = get_api_key()
        if not key or not key.strip() or "your_" in key.lower():
            self.skipTest("No real GEMINI_API_KEY configured for live test")

        result = generate_chat_response("Is aluminium foil recyclable? Reply in under 15 words.")
        self.assertIn("reply", result)
        self.assertIsInstance(result["reply"], str)
        self.assertGreater(len(result["reply"]), 0)

    def test_10_ai_insight_endpoint(self):
        """Test generate_ai_insight format and response."""
        mock_response = MagicMock()
        mock_response.text = "Recyclable: Yes\nRecommended Bin: Blue\nEnvironmental Impact: Saves energy"

        with patch("services.ai_services.get_gemini_model") as mock_model_getter:
            mock_model = MagicMock()
            mock_model.generate_content.return_value = mock_response
            mock_model_getter.return_value = mock_model

            result = generate_ai_insight("plastic bottle")
            self.assertIn("insight", result)
            self.assertIn("Recyclable", result["insight"])

    def test_11_health_and_model_loading(self):
        """Test that predict model path resolves properly and prediction works."""
        from predict import predict_image, CLASS_NAMES
        import io
        from PIL import Image

        # Create a small dummy image in memory
        img = Image.new("RGB", (224, 224), color=(73, 109, 137))
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)

        result = predict_image(img_byte_arr)
        self.assertIn("prediction", result)
        self.assertIn("confidence", result)
        self.assertIn("details", result)
        self.assertIn(result["prediction"], CLASS_NAMES)


if __name__ == "__main__":
    unittest.main()
