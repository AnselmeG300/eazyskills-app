from pydantic import BaseModel
from typing import List, Optional


class ItemSchema(BaseModel):
    """
    Schéma de réponse pour une entité Item.
    """

    id: int
    slug: str
    name: str
    url: str
    description: str
    metadata_json: Optional[List[str]]
    language: str
    deprecated: bool

    class Config:
        orm_mode = True


class CategorySchema(BaseModel):
    """
    Schéma de réponse pour une entité Category.
    """

    id: int
    slug: str
    name: str
    item_urls: List[str]  # IDs résolus en URLs
    url: Optional[str]
    language: str
    deprecated: bool

    class Config:
        orm_mode = True
