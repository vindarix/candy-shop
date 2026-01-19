import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const buttonStyle =
    "bg-pink-200 hover:bg-pink-100 text-pink-900 px-4 py-2 rounded-lg shadow font-semibold transition";

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-pink-100 via-pink-200 to-beige-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-4 flex justify-center items-center gap-6">
        <button onClick={() => navigate("/")} className={buttonStyle}>
          Главная
        </button>
        <button onClick={() => navigate("/cart")} className={buttonStyle}>
          Корзина
        </button>
      </div>
    </header>
  );
}
