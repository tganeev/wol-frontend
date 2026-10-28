"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // Состояние для пользователя
  const [user, setUser] = useState<any>(null);
  // Флаг, чтобы понять, что мы в браузере
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Функция чтения пользователя
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Вызываем сразу
    checkUser();

    // И запускаем интервал, который будет проверять localStorage каждые 500мс
    // (Это заставит React перерисовать компонент, когда данные появятся)
    const interval = setInterval(checkUser, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Пока не загрузились на клиенте - ничего не рендерим
  if (!isClient) return <div className="h-10 w-48"></div>;

  // Если пользователь есть - показываем имя и выход
  if (user) {
    return (
      <nav className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          Hi, {user.name} ({user.role})
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Log out
        </button>
      </nav>
    );
  }

  // Если пользователя нет - кнопки входа
  return (
    <nav className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Log in
      </Link>
      <Link
        href="/register"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        Sign up
      </Link>
    </nav>
  );
}