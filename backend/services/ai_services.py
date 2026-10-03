import os
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai
from google.api_core import exceptions as google_exceptions
from google.auth import exceptions as auth_exceptions
from fastapi import HTTPException

# Load .env from backend directory as well as current working directory
_backend_dir = Path(__file__).resolve().parent.parent
_env_path = _backend_dir / ".env"
if _env_path.exists():
    load_dotenv(dotenv_path=_env_path)
load_dotenv()

DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
TIMEOUT_SECONDS = float(os.getenv("GEMINI_TIMEOUT", "30.0"))


def get_api_key():
    return os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")


def get_gemini_model(model_name: str = None, system_instruction: str = None):
    api_key = get_api_key()
    if not api_key or not api_key.strip():
        raise HTTPException(
            status_code=503,
            detail="Gemini API key is not configured on the server. Please set GEMINI_API_KEY in the environment."
        )
    genai.configure(api_key=api_key.strip())
    selected_model = model_name or DEFAULT_MODEL
    kwargs = {"model_name": selected_model}
    if system_instruction:
        kwargs["system_instruction"] = system_instruction
    return genai.GenerativeModel(**kwargs)


def _extract_response_text(response) -> str:
    """Safely extracts text from Gemini response, avoiding crashes on blocked candidates."""
    try:
        if hasattr(response, "text") and response.text:
            return response.text
    except Exception:
        pass

    if hasattr(response, "candidates") and response.candidates:
        candidate = response.candidates[0]
        finish_reason = getattr(candidate, "finish_reason", None)
        if finish_reason and str(finish_reason) in ["SAFETY", "RECITATION", "OTHER"]:
            raise HTTPException(
                status_code=400,
                detail=f"Response was blocked by safety filters (reason: {finish_reason})."
            )
        if hasattr(candidate, "content") and hasattr(candidate.content, "parts"):
            parts_text = "".join(getattr(part, "text", "") for part in candidate.content.parts)
            if parts_text:
                return parts_text

    raise HTTPException(
        status_code=502,
        detail="The AI model returned an empty or unparseable response."
    )


def generate_ai_insight(waste_type: str):
    if not waste_type or not str(waste_type).strip():
        raise HTTPException(status_code=400, detail="Waste type is required.")

    prompt = f"""
You are an expert in waste management.

Waste Type: {waste_type}

Return ONLY the answer in this format.

Recyclable:
Recommended Bin:
Environmental Impact:
Disposal Tip:
Interesting Fact:
"""
    try:
        model = get_gemini_model()
        response = model.generate_content(
            prompt,
            request_options={"timeout": TIMEOUT_SECONDS}
        )
        return {
            "insight": _extract_response_text(response)
        }
    except HTTPException:
        raise
    except (auth_exceptions.DefaultCredentialsError, google_exceptions.PermissionDenied) as e:
        raise HTTPException(status_code=401, detail="Authentication failed. Please verify your Gemini API key.") from e
    except google_exceptions.InvalidArgument as e:
        raise HTTPException(status_code=400, detail=f"Invalid Gemini API request or key: {e.message if hasattr(e, 'message') else str(e)}") from e
    except google_exceptions.ResourceExhausted as e:
        raise HTTPException(status_code=429, detail="Gemini API rate limit or quota exceeded. Please try again shortly.") from e
    except google_exceptions.DeadlineExceeded as e:
        raise HTTPException(status_code=504, detail="Gemini API request timed out. Please try again.") from e
    except google_exceptions.NotFound as e:
        raise HTTPException(status_code=404, detail=f"Gemini model not found: {e.message if hasattr(e, 'message') else str(e)}") from e
    except google_exceptions.GoogleAPIError as e:
        raise HTTPException(status_code=502, detail=f"Gemini API service error: {e.message if hasattr(e, 'message') else str(e)}") from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error while generating AI insight: {str(e)}") from e


def generate_chat_response(message: str):
    if not message or not str(message).strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    system_instruction = (
        "You are WasteWise AI, an expert and friendly AI assistant specializing in waste management, "
        "recycling, composting, and environmental sustainability. Help users classify waste, understand "
        "recycling rules, and adopt eco-friendly habits. Keep your responses concise, helpful, and "
        "formatted in clean Markdown."
    )

    try:
        chat_model = get_gemini_model(system_instruction=system_instruction)
        response = chat_model.generate_content(
            message.strip(),
            request_options={"timeout": TIMEOUT_SECONDS}
        )
        return {
            "reply": _extract_response_text(response)
        }
    except HTTPException:
        raise
    except (auth_exceptions.DefaultCredentialsError, google_exceptions.PermissionDenied) as e:
        raise HTTPException(status_code=401, detail="Authentication failed. Please verify your Gemini API key.") from e
    except google_exceptions.InvalidArgument as e:
        raise HTTPException(status_code=400, detail=f"Invalid Gemini API request or key: {e.message if hasattr(e, 'message') else str(e)}") from e
    except google_exceptions.ResourceExhausted as e:
        raise HTTPException(status_code=429, detail="Gemini API rate limit or quota exceeded. Please try again shortly.") from e
    except google_exceptions.DeadlineExceeded as e:
        raise HTTPException(status_code=504, detail="Gemini API request timed out. Please try again.") from e
    except google_exceptions.NotFound as e:
        raise HTTPException(status_code=404, detail=f"Gemini model not found: {e.message if hasattr(e, 'message') else str(e)}") from e
    except google_exceptions.GoogleAPIError as e:
        raise HTTPException(status_code=502, detail=f"Gemini API service error: {e.message if hasattr(e, 'message') else str(e)}") from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error while generating chat response: {str(e)}") from e