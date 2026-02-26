from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import get_all_items, get_all_categories
from app.schemas import ItemSchema, CategorySchema

router = APIRouter()


@router.get("/items", response_model=list[ItemSchema])
def read_items(db: Session = Depends(get_db)):
    """
    Retourne la liste de tous les items.
    """
    return get_all_items(db)


@router.get("/categories", response_model=list[CategorySchema])
def read_categories(db: Session = Depends(get_db)):
    """
    Retourne la liste de toutes les catégories avec les URLs résolues.
    """
    return get_all_categories(db)
