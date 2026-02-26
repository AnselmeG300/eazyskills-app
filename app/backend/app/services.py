from sqlalchemy.orm import Session
from app.models import Item, Category


def get_all_items(db: Session):
    """
    Récupère toutes les entités Item depuis la base de données.
    TODO: implémenter le filtrage, la pagination, etc.
    """
    return db.query(Item).all()


def get_all_categories(db: Session):
    """
    Récupère toutes les catégories et résout les URLs des items associés.
    TODO: implémenter la logique de résolution des IDs.
    """
    categories = db.query(Category).all()
    items = {item.slug: item.url for item in db.query(Item).all()}

    for category in categories:
        category.item_urls = [
            items.get(item_id, "URL non trouvée")
            for item_id in (category.item_ids or [])
        ]

    return categories
