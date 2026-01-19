from pydantic import BaseModel

class CandyResponse(BaseModel):
    id: int
    name: str
    description: str
    price: int
    image_url: str
