import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandyModal({ candy, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === candy.id);
    if (existing) existing.quantity += quantity;
    else cart.push({ ...candy, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <AnimatePresence>
      {candy && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-pink-200/30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />

          <motion.div
            className="relative bg-pink-50 rounded-2xl p-6 w-full max-w-2xl shadow-lg z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-pink-900 font-bold text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={candy.image_url}
                alt={candy.name}
                className="w-64 h-64 object-contain rounded-xl"
              />
              <div className="flex flex-col justify-between">
                <h1 className="font-bold uppercase text-3xl text-pink-800">
                  {candy.name}
                </h1>
                <p className="text-gray-700 mt-2">{candy.description}</p>
                <p className="font-semibold text-pink-900 mt-2 text-xl">
                  {candy.price} ₽
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                  <button
                    onClick={addToCart}
                    className="bg-pink-200 hover:bg-pink-100 text-pink-900 px-4 py-2 rounded-lg shadow font-semibold"
                  >
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-pink-200 text-pink-900 px-6 py-2 rounded shadow font-semibold z-20"
                >
                  {candy.name} добавлен в корзину
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
