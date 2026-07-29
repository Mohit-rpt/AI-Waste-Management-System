import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3.5-flash")


def generate_ai_insight(waste_type):
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

    response = model.generate_content(prompt)

    return {
        "insight": response.text
    }


def generate_chat_response(message: str):
    system_instruction = (
        "You are WasteWise AI, an expert and friendly AI assistant specializing in waste management, "
        "recycling, composting, and environmental sustainability. Help users classify waste, understand "
        "recycling rules, and adopt eco-friendly habits. Keep your responses concise, helpful, and "
        "formatted in clean Markdown."
    )
    
    chat_model = genai.GenerativeModel(
        model_name="gemini-3.5-flash",
        system_instruction=system_instruction
    )
    
    response = chat_model.generate_content(message)
    return {
        "reply": response.text
    }