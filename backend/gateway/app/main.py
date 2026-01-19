from fastapi import FastAPI
import httpx
import os

app = FastAPI(title="API шлюз")

CATALOG_URL = os.getenv("CATALOG_URL")

@app.get("/candies")
async def candies():
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{CATALOG_URL}/candies")
        return r.json()

@app.get("/candies/{candy_id}")
async def candy(candy_id: int):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{CATALOG_URL}/candies/{candy_id}")
        return r.json()

