import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_image
from services.ai_services import generate_ai_insight, generate_chat_response, get_api_key, DEFAULT_MODEL
from pydantic import BaseModel, Field

app = FastAPI(title="AI Waste Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Waste Management API is Running 🚀"
    }


@app.get("/health")
def health():
    key_configured = bool(get_api_key() and get_api_key().strip())
    return {
        "status": "healthy",
        "gemini_configured": key_configured,
        "model": DEFAULT_MODEL
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    result = predict_image(io.BytesIO(contents))
    return result


class AIRequest(BaseModel):
    waste: str = Field(..., min_length=1)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


@app.post("/ai-insight")
def ai_insight(request: AIRequest):
    if not request.waste or not request.waste.strip():
        raise HTTPException(status_code=400, detail="Waste type cannot be empty.")
    return generate_ai_insight(request.waste)


@app.post("/chat")
def chat(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    return generate_chat_response(request.message)