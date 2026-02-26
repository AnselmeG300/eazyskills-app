import json
from sqlalchemy import Column, Integer, String, Boolean, Text
from app.database import Base
from sqlalchemy.types import TypeDecorator


class JSONType(TypeDecorator):
    """Stocke les listes/dicts Python sous forme de JSON en base."""

    impl = Text

    def process_bind_param(self, value, dialect):
        if value is not None:
            return json.dumps(value)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            return json.loads(value)
        return value


class Item(Base):
    """
    Modèle générique illustrant la structure d'une entité principale.
    Remplacer par les modèles métier réels.
    """

    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    url = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    metadata_json = Column(JSONType)
    language = Column(String, nullable=False)
    deprecated = Column(Boolean, default=False)


class Category(Base):
    """
    Modèle générique illustrant la structure d'une catégorie.
    Remplacer par les modèles métier réels.
    """

    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    item_ids = Column(JSONType, nullable=False)
    url = Column(Text)
    language = Column(String, nullable=False)
    deprecated = Column(Boolean, default=False)
