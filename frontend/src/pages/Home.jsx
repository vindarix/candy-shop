import { useEffect, useState } from "react";
import { api } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import CandyModal from "./CandyModal";

export default function Home() {
  const [candies, setCandies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loaded, setLoaded] = useState([]);
  const [selectedCandy, setSelectedCandy] = useState(null);

  useEffect(() => {
    api.get("/candies").then((r) => {
      setCandies(r.data);
      setLoaded(r.data.slice(0, visibleCount));
    });
  }, []);

  const loadMore = () => {
    const nextItems = candies.slice(loaded.length, loaded.length + 6);
    setLoaded((prev) => [...prev, ...nextItems]);
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="px-6 md:px-16 py-8">
      <section className="bg-linear-to-r from-pink-100 via-pink-200 to-pink-50 rounded-2xl p-12 mb-10 text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-pink-900">
          ИНТЕРНЕТ-МАГАЗИН "СЛАСТЁНА"
        </h1>
        <p className="mb-6 text-lg text-pink-700">
          Самые вкусные сладости собраны здесь
        </p>
      </section>

      {candies.length === 0 ? (
        <p className="text-center text-pink-800 font-bold text-xl">
          Упс… кажется, здесь пусто!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {loaded.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="flex border rounded-2xl shadow p-4 h-48 cursor-pointer"
                    onClick={() => setSelectedCandy(c)}
                  >
                    <div className="w-1/3 shrink-0">
                      <img
                        src={c.image_url}
                        alt={c.name}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div className="ml-4 flex flex-col justify-between w-2/3">
                      <h2 className="font-bold uppercase text-lg text-pink-800">
                        {c.name}
                      </h2>
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {c.description}
                      </p>
                      <p className="font-semibold text-pink-900">{c.price} ₽</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {loaded.length < candies.length && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                className="bg-pink-200 hover:bg-pink-100 text-pink-900 px-6 py-3 rounded-lg shadow font-semibold transition transform hover:scale-105"
              >
                Загрузить ещё
              </button>
            </div>
          )}
        </>
      )}

      {selectedCandy && (
        <CandyModal
          candy={selectedCandy}
          onClose={() => setSelectedCandy(null)}
        />
      )}
    </div>
  );
}
