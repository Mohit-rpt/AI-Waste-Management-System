from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_image

app = FastAPI(title="AI Waste Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
    result = predict_image(file.file)
    return result