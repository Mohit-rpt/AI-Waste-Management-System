import time
import subprocess
import requests
import sys

def run_tests():
    port = 8009
    url = f"http://127.0.0.1:{port}"
    
    from pathlib import Path
    backend_dir = Path(__file__).resolve().parent

    # Start uvicorn server in subprocess
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app:app", "--port", str(port), "--host", "127.0.0.1"],
        cwd=str(backend_dir),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    try:
        # Wait for server to start
        connected = False
        for _ in range(30):
            try:
                res = requests.get(f"{url}/health", timeout=1.0)
                if res.status_code == 200:
                    connected = True
                    break
            except Exception:
                time.sleep(0.5)

        if not connected:
            print("FAILED: Could not connect to uvicorn test server.")
            sys.exit(1)

        print("[1] Health check test:")
        res = requests.get(f"{url}/health")
        assert res.status_code == 200, f"Expected 200, got {res.status_code}"
        data = res.json()
        assert data["status"] == "healthy"
        assert data["gemini_configured"] is True
        print("  PASS: Health check returned healthy and gemini_configured=True")

        print("[2] Root endpoint test:")
        res = requests.get(f"{url}/")
        assert res.status_code == 200
        print("  PASS: Root endpoint returned 200 OK")

        print("[3] Empty message test:")
        res = requests.post(f"{url}/chat", json={"message": "   "})
        assert res.status_code == 400, f"Expected 400, got {res.status_code}"
        print("  PASS: Empty message returned 400 Bad Request")

        print("[4] Valid chat message test:")
        res = requests.post(f"{url}/chat", json={"message": "Can I recycle dry newspapers? Answer in 10 words."})
        assert res.status_code == 200, f"Expected 200, got {res.status_code}"
        reply = res.json().get("reply")
        assert reply and len(reply) > 0, "Expected non-empty reply"
        print(f"  PASS: Chat endpoint returned 200 with reply: {reply[:60]}...")

        print("[5] Empty waste type for ai-insight:")
        res = requests.post(f"{url}/ai-insight", json={"waste": ""})
        assert res.status_code in [400, 422], f"Expected 400/422, got {res.status_code}"
        print("  PASS: Empty waste insight returned error status")

        print("\nALL HTTP API ENDPOINT TESTS PASSED SUCCESSFULLY!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()

if __name__ == "__main__":
    run_tests()
