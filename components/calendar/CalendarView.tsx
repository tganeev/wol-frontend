"use client";

import FullCalendar from "@fullcalendar/react";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import { useMemo, useState } from "react";
import { Slot } from "@/types";
import { aggregateSlots, SlotBucket } from "@/lib/aggregateSlots";
import SlotDetailsModal from "./SlotDetailsModal";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

interface Props {
  slots: Slot[];
}

export default function CalendarView({ slots }: Props) {
  const buckets = useMemo(() => aggregateSlots(slots), [slots]);
  const [activeBucket, setActiveBucket] = useState<SlotBucket | null>(null);

  const events = buckets.map((b) => ({
  id: b.slotIds.join(","),
  start: b.bucketStart.toISOString(),
  title: b.slots.length > 1 ? `${b.slots.length} sessions` : b.slots[0].title,
  extendedProps: { bucket: b },
  className: b.slots.length > 1 ? "stacked-slot" : "", // класс только для бакетов > 1
}));

  return (
    <>
      <FullCalendar
        plugins={[
          classicThemePlugin,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        slotMinTime="06:00:00"
        slotMaxTime="23:00:00"
        events={events}
        // Ключевой момент: настройка отображаемого содержимого
        eventContent={(eventInfo) => {
          const bucket = eventInfo.event.extendedProps.bucket as SlotBucket;
          const count = bucket.slots.length;

          // Если это перекрывающееся событие (больше 1), показываем количество крупным шрифтом
          if (count > 1) {
            return (
              <div className="flex flex-col items-center justify-center h-full p-1 text-center">
                <div className="text-xl font-bold leading-none">{count}</div>
                <div className="text-[10px] mt-1 opacity-90">sessions</div>
              </div>
            );
          }

          // Одиночное событие: показываем оригинальный заголовок (можно настроить под свои нужды)
          return (
            <div className="p-1 text-xs leading-tight">
              <div className="font-semibold">{bucket.slots[0].title}</div>
            </div>
          );
        }}
        eventClick={(info) => {
          const bucket = info.event.extendedProps.bucket as SlotBucket;
          setActiveBucket(bucket);
        }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
      />
      {activeBucket && (
        <SlotDetailsModal
          bucket={activeBucket}
          onClose={() => setActiveBucket(null)}
        />
      )}
    </>
  );
}