// lib/aggregateSlots.ts
import { Slot } from "@/types";

export interface SlotBucket {
  bucketStart: Date;
  slotIds: string[];
  slots: Slot[];
}

const BUCKET_MINUTES = 30;

function floorToBucket(date: Date, bucketMinutes: number): Date {
  const ms = bucketMinutes * 60 * 1000;
  return new Date(Math.floor(date.getTime() / ms) * ms);
}

export function aggregateSlots(slots: Slot[]): SlotBucket[] {
  const map = new Map<number, SlotBucket>();

  for (const slot of slots) {
    const start = new Date(slot.startAt);
    const bucketStart = floorToBucket(start, BUCKET_MINUTES);
    const key = bucketStart.getTime();

    if (!map.has(key)) {
      map.set(key, { bucketStart, slotIds: [], slots: [] });
    }
    const bucket = map.get(key)!;
    bucket.slotIds.push(slot.id);
    bucket.slots.push(slot);
  }

  return Array.from(map.values()).sort(
    (a, b) => a.bucketStart.getTime() - b.bucketStart.getTime()
  );
}