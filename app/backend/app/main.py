from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as api_router
from app.chatgpt import router as chatgpt_router
from app.database import Base, engine
from mangum import Mangum
import os

ENV = os.getenv("ENV", "DEV")

# Initialisation de l'application FastAPI
app = FastAPI(
    title="My API",
    description="API publique – squelette de démonstration",
    version="1.0.0",
)

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    # TODO: ajouter les origines de production autorisées
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

# Enregistrement des routers
app.include_router(api_router)
app.include_router(chatgpt_router, prefix="/chat", tags=["Chat"])


@app.get("/")
def read_root():
    """
    Endpoint racine – health check.
    """
    return {"message": "API opérationnelle"}


@app.on_event("startup")
def on_startup():
    """
    Initialisation au démarrage : création des tables si nécessaire.
    TODO: ajouter le seed initial des données si ENV == 'DEPLOY'.
    """
    if ENV == "DEPLOY":
        Base.metadata.create_all(bind=engine)


# Handler AWS Lambda (via Mangum)
def lambda_handler(event, context):
    handler = Mangum(app)
    return handler(event, context)
