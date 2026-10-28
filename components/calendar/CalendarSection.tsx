"use client";

import { useState, useEffect } from "react";
import CalendarView from "./CalendarView";
import { Slot } from "@/types";
import { fetchApi } from "@/lib/api";

export default function CalendarSection() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotTitle, setNewSlotTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    try {
      const data = await fetchApi("/slots");
      setSlots(data);
    } catch (err: any) {
      console.error("Failed to load slots:", err);
      setError("Failed to load slots. Check if backend is running.");
    }
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTime) return;
    setError("");

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setError("You must be logged in to create a slot.");
      return;
    }

    const date = new Date(newSlotTime);

    const slotData = {
      title: newSlotTitle || "Untitled Session",
      description: "",
      startAt: date.toISOString(),
      durationMinutes: 60,
      format: "ONLINE",
      level: "ANY",
      markers: "",
      capacity: 5,
      location: null,
      onlineLink: "https://meet.google.com/test",
    };

    try {
      const newSlot = await fetchApi("/slots", {
        method: "POST",
        body: JSON.stringify(slotData),
      });
      
      setSlots((prev) => [...prev, newSlot]);
      setNewSlotTime("");
      setNewSlotTitle("");
      setIsFormOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
        
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