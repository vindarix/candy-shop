import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function Candy() {
  const { id } = useParams();
  const [candy, setCandy] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/candies/${id}`).then((r) => setCandy(r.data));
  }, [id]);

  if (!candy) return <div>Загрузка...</div>;

  return (
    <div className="px-6 md:px-16 py-8 flex gap-8">
      <img
        src={candy.image_url}
        alt={candy.name}
        className="w-48 h-48 object-cover rounded-xl"
      />
      <div className="flex flex-col">
        <h1 className="font-bold uppercase text-3xl text-pink-800 mb-4">
          {candy.name}
        </h1>
        <p className="text-gray-700 mb-4 line-clamp-5">{candy.description}</p>
        <p className="font-semibold text-pink-900 mb-4">{candy.price} ₽</p>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20 mb-2"
        />
        <button className="bg-pink-200 hover:bg-pink-100 text-pink-900 px-4 py-2 rounded-lg shadow font-semibold">
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
