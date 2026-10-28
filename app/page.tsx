// app/page.tsx
import { Suspense } from "react";
import CalendarSection from "@/components/calendar/CalendarSection";
import Link from "next/link"; // Импортируем Link из Next.js

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      {/* Шапка сайта */}
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Way of Learning</h1>
          <p className="text-gray-600 mt-1">
            Free English sessions — find a slot and join.
          </p>
        </div>
        
        {/* Блок авторизации */}
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
      </header>

      <section className="max-w-6xl mx-auto bg-white rounded-lg shadow p-4">
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading calendar…</div>}>
          <CalendarSection />
        </Suspense>
      </section>
    </main>
  );
}