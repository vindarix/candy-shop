import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex justify-center px-6 md:px-16 py-8 min-h-screen">
      <div className="w-full max-w-3xl bg-pink-50 p-6 rounded-2xl shadow flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-pink-800 font-baloo text-center">
          Корзина
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-pink-700 text-lg">
            Ваша корзина пуста...
          </p>
        ) : (
          <>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border rounded p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded"
                    />
                    <div>
                      <h2 className="font-bold text-pink-800">{item.name}</h2>
                      <p className="text-gray-700">
                        {item.price} ₽ x {item.quantity} ={" "}
                        {item.price * item.quantity} ₽
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-200 hover:bg-red-100 text-red-800 px-3 py-1 rounded font-semibold"
                    >
                      Удалить
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="text-right font-bold text-pink-900 text-xl mt-4">
              Итого: {total} ₽
            </div>

            <button className="mt-4 bg-green-200 hover:bg-green-100 text-green-900 px-6 py-3 rounded-lg shadow font-semibold transition transform hover:scale-105">
              Купить
            </button>
          </>
        )}
      </div>
    </div>
  );
}
