from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
import os
import requests

# Initialisation du router
router = APIRouter()

# Clé API OpenAI (à définir via variable d'environnement)
openai.api_key = os.getenv("OPENAI_API_KEY")

BACKEND_BASE_URL = os.getenv("BACKEND_BASE_URL", "http://localhost:8000")


class ChatRequest(BaseModel):
    """
    Corps de la requête pour l'endpoint ChatGPT.
    """

    prompt: str


def fetch_data(endpoint: str) -> list:
    """
    Récupère les données depuis un endpoint interne du backend.
    """
    try:
        response = requests.get(
            f"{BACKEND_BASE_URL}/{endpoint}",
            headers={"origin": "internal"},
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur récupération {endpoint}: {e}")


def build_context() -> str:
    """
    Construit le contexte à envoyer au modèle LLM.
    TODO: adapter la structure du contexte au domaine métier.
    """
    items = fetch_data("items")
    categories = fetch_data("categories")

    context = "### Ressources disponibles:\n\n"

    context += "#### Items:\n"
    for item in items:
        context += (
            f"- **{item['name']}**\n"
            f"  - URL: {item['url']}\n"
            f"  - Description: {item['description']}\n"
        )

    context += "\n#### Catégories:\n"
    for cat in categories:
        context += (
            f"- **{cat['name']}**\n"
            f"  - Langue: {cat['language']}\n"
        )

    return context


@router.post("")
def chat_endpoint(request: ChatRequest):
    """
    Endpoint principal d'interaction avec le modèle LLM.
    Reçoit un prompt utilisateur et retourne une réponse contextualisée.
    """
    try:
        context = build_context()

        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        # TODO: remplacer par le prompt système adapté au domaine métier
                        "You are a helpful assistant. Answer user questions based on the provided context."
                    ),
                },
                {"role": "system", "content": context},
                {"role": "user", "content": request.prompt},
            ],
            temperature=0.7,
        )

        return {"response": response["choices"][0]["message"]["content"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
