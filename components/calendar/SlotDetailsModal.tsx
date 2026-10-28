// components/calendar/SlotDetailsModal.tsx
"use client";

import { SlotBucket } from "@/lib/aggregateSlots";

interface Props {
  bucket: SlotBucket;
  onClose: () => void;
}

export default function SlotDetailsModal({ bucket, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {bucket.slots.length === 1
              ? "Session details"
              : `${bucket.slots.length} sessions at this time`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <ul className="space-y-4">
          {bucket.slots.map((slot) => (
            <li key={slot.id} className="border rounded-lg p-4">
              <div className="font-medium">{slot.title}</div>
              <div className="text-sm text-gray-600">
                Host: {slot.hostName} · Level: {slot.level} ·{" "}
                {slot.format === "ONLINE" ? "Online" : "Offline"}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(slot.startAt).toLocaleString()} ·{" "}
                {slot.durationMinutes} min
              </div>
              {slot.capacity && (
                <div className="text-sm text-gray-600">
                  Enrolled: {slot.enrolledCount}/{slot.capacity}
                </div>
              )}
              {slot.format === "OFFLINE" && slot.location && (
                <div className="text-sm text-gray-600">
                  Location: {slot.location}
                </div>
              )}
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={() => alert("Запись появится на следующем шаге")}
              >
                {slot.format === "ONLINE" ? "Sign up" : "I'll come"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}