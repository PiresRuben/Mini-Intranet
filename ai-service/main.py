from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Jint AI Service")

# CORS pour que le frontend puisse appeler ce service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles de requête

class TextInput(BaseModel):
    text: str

class TranslateInput(BaseModel):
    text: str
    target_language: str = "en"

class ChatInput(BaseModel):
    message: str

# Routes

@app.get("/")
def root():
    return {"service": "Jint AI Service", "status": "running"}

@app.post("/summarize")
def summarize(input: TextInput):
    # Mock : on prend juste les 100 premiers caractères
    words = input.text.split()
    summary = " ".join(words[:20]) + "..." if len(words) > 20 else input.text
    return {
        "original_length": len(words),
        "summary": f"[Résumé IA] {summary}"
    }

@app.post("/translate")
def translate(input: TranslateInput):
    # Mock : on simule une traduction
    return {
        "original": input.text,
        "translated": f"[Traduit en {input.target_language}] {input.text}",
        "target_language": input.target_language
    }

@app.post("/chat")
def chat(input: ChatInput):
    # Mock : réponses prédéfinies
    responses = {
        "bonjour": "Bonjour ! Je suis l'assistant IA de Jint. Comment puis-je vous aider ?",
        "aide": "Je peux résumer des articles, traduire du texte, ou répondre à vos questions !",
    }
    # Cherche un mot-clé dans le message
    message_lower = input.message.lower()
    for key, response in responses.items():
        if key in message_lower:
            return {"response": response}
    
    return {"response": f"Merci pour votre message. Je suis un assistant mock — en production, je serais connecté à un vrai modèle IA !"}