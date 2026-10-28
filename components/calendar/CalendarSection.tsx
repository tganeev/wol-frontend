"use client";

import { useState } from "react";
import CalendarView from "./CalendarView";
import { Slot } from "@/types";

export default function CalendarSection() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotTitle, setNewSlotTitle] = useState("");

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTime) return;

    // Преобразуем локальное время из input в ISO (UTC)
    const date = new Date(newSlotTime);

    const newSlot: Slot = {
      id: `test-${Date.now()}`,
      hostId: "h-test",
      hostName: "Test Host",
      title: newSlotTitle || "Untitled Session",
      startAt: date.toISOString(),
      durationMinutes: 60,
      format: "ONLINE",
      level: "ANY",
      markers: [],
      capacity: 5,
      enrolledCount: 0,
      status: "SCHEDULED",
    };

    setSlots((prev) => [...prev, newSlot]);
    
    // Сбрасываем форму
    setNewSlotTime("");
    setNewSlotTitle("");
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="mb-6">
        {!isFormOpen ? (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
          >
            + Add new slot
          </button>
        ) : (
          <form onSubmit={handleAddSlot} className="bg-gray-50 border p-4 rounded-lg max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={newSlotTime}
                onChange={(e) => setNewSlotTime(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Title
              </label>
              <input
                type="text"
                placeholder="e.g., Conversation Practice"
                value={newSlotTitle}
                onChange={(e) => setNewSlotTitle(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
              >
                Save Slot
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <CalendarView slots={slots} />
    </div>
  );
}