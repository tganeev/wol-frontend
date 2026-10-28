import { Suspense } from "react";
import CalendarSection from "@/components/calendar/CalendarSection";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Way of Learning</h1>
          <p className="text-gray-600 mt-1">
            Free English sessions — find a slot and join.
          </p>
        </div>
        
        <Navbar />
      </header>

      <section className="max-w-6xl mx-auto bg-white rounded-lg shadow p-4">
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading calendar…</div>}>
          <CalendarSection />
        </Suspense>
      </section>
    </main>
  );
}