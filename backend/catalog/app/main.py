from fastapi import FastAPI
from sqlalchemy import select
from database import engine, SessionLocal
from models import Base, Candy

app = FastAPI(title="Каталог конфет")

candies = [
    {
        "name": "Ferrero Rocher",
        "description": "Шоколадные шарики Ferrero Rocher с цельным орехом в хрустящей вафельной оболочке, покрытые молочным шоколадом и тонким слоем измельченного ореха. Идеальные для подарков или праздничного стола.",
        "price": 650,
        "image_url": "https://i.ebayimg.com/images/g/sjQAAOSw21pfzsoN/s-l400.jpg"
    },
    {
        "name": "Toblerone",
        "description": "Швейцарский шоколад Toblerone с медом и миндалем, известный своей уникальной треугольной формой. Идеально подходит для любителей нежного шоколада с хрустящей текстурой.",
        "price": 300,
        "image_url": "https://i.ebayimg.com/images/g/SeUAAeSwEaJpHhN0/s-l1200.webp"
    },
    {
        "name": "Haribo Goldbears",
        "description": "Мармеладные мишки Haribo Goldbears – классические жевательные конфеты с фруктовыми вкусами, мягкие и ароматные, любимые детьми и взрослыми.",
        "price": 150,
        "image_url": "https://files.ekmcdn.com/3bbda1/images/haribo-gold-bears-140g-bag-37-p.jpg?w=1000&h=1000&v=EA7D9831-6D1B-41AE-A6F8-89E6D7AF4BB1"
    },
    {
        "name": "Птица дивная",
        "description": "Воздушное суфле в шоколадной глазури 'Птица дивная', с нежной текстурой, которая тает во рту. Идеально сочетается с чаем или кофе.",
        "price": 280,
        "image_url": "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/d9/0c/dcfa9ffc2a06a9b5d434a8391cfc.jpg"
    },
    {
        "name": "Lindt Excellence",
        "description": "Премиальный молочный шоколад Lindt Excellence с богатым вкусом какао и сливочной текстурой. Отличный выбор для ценителей качественного шоколада.",
        "price": 220,
        "image_url": "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/fa/42/3578ffaf9afeacc65d76676abef5.jpg"
    },
    {
        "name": "Milky Way",
        "description": "Шоколадный батончик Milky Way с мягкой карамельной начинкой и нежным молочным шоколадом. Идеально для перекуса в любое время дня.",
        "price": 80,
        "image_url": "https://novostea.ru/wp-content/uploads/2021/03/Milki-Vej-Milky-Way-minis.jpg"
    },
    {
        "name": "Молочная коровка",
        "description": "Нежная молочная помадка 'Молочная коровка' с мягкой текстурой и сладким вкусом молока. Популярные классические конфеты для детства и сладких воспоминаний.",
        "price": 120,
        "image_url": "https://www.candystor.ru/upload/iblock/b01/lc4jt31ivuvcb3y4a0de79orrcb2mkg2/konfety_molochnyje_nglaz_korovka_5kg_rot_front.jpg"
    },
    {
        "name": "Raffaello",
        "description": "Изысканные кокосовые шарики Raffaello с миндальной начинкой и хрустящей обсыпкой из кокосовой стружки. Прекрасно подходят для праздничных подарков и десертов.",
        "price": 500,
        "image_url": "https://i.ebayimg.com/images/g/EEkAAOSwBh9kAb0i/s-l400.jpg"
    },
    {
        "name": "KitKat",
        "description": "Шоколадные вафельные батончики KitKat с нежным молочным шоколадом. Можно ломать на палочки, удобно делиться с друзьями и наслаждаться хрустящей текстурой.",
        "price": 90,
        "image_url": "https://i.ebayimg.com/images/g/pNwAAOSwsxxhnjWP/s-l400.jpg"
    },
    {
        "name": "Bounty",
        "description": "Шоколадные батончики Bounty с начинкой из мягкого кокоса и молочного шоколада. Прекрасное сочетание шоколада и тропического вкуса кокоса.",
        "price": 120,
        "image_url": "https://i.ebayimg.com/images/g/p4UAAOSwdjdaOmOS/s-l400.jpg"
    },
    {
        "name": "Chupa Chups",
        "description": "Леденцы Chupa Chups разных фруктовых вкусов на палочке. Яркие, сладкие и любимые детьми по всему миру.",
        "price": 50,
        "image_url": "https://i.ebayimg.com/images/g/uigAAOSws1RkCv2u/s-l400.jpg"
    },
    {
        "name": "Mars",
        "description": "Шоколадный батончик Mars с карамелью, нугой и молочным шоколадом. Классический сытный батончик для сладкого перекуса.",
        "price": 95,
        "image_url": "https://i.ebayimg.com/images/g/nOEAAOSwDFBaIUVf/s-l1200.jpg"
    },
    {
        "name": "Twix",
        "description": "Шоколадный батончик Twix с хрустящей печенькой, покрытой карамелью и молочным шоколадом. Идеально для разделения с друзьями.",
        "price": 110,
        "image_url": "https://i.ebayimg.com/images/g/xwwAAOSwqJRjKvAy/s-l400.jpg"
    }
]

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with SessionLocal() as session:
        result = await session.execute(select(Candy))
        if not result.scalars().first():
            session.add_all([Candy(**c) for c in candies])
            await session.commit()

@app.get("/candies")
async def get_candies():
    async with SessionLocal() as session:
        result = await session.execute(select(Candy))
        return result.scalars().all()

@app.get("/candies/{candy_id}")
async def get_candy(candy_id: int):
    async with SessionLocal() as session:
        result = await session.execute(select(Candy).where(Candy.id == candy_id))
        return result.scalar_one()
