import io
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_image
from services.ai_services import generate_ai_insight, generate_chat_response
from pydantic import BaseModel

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


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    result = predict_image(io.BytesIO(contents))
    return result


class AIRequest(BaseModel):
    waste: str


class ChatRequest(BaseModel):
    message: str


@app.post("/ai-insight")
def ai_insight(request: AIRequest):
    return generate_ai_insight(request.waste)


@app.post("/chat")
def chat(request: ChatRequest):
    return generate_chat_response(request.message)