// types/index.ts

export type UserRole = "HOST" | "PEER";

export type SlotFormat = "ONLINE" | "OFFLINE";

export type SlotStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export type SlotLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ANY";

export type SlotMarker =
  | "BEGINNER_FRIENDLY"
  | "CONVERSATION_ONLY"
  | "GRAMMAR_FOCUS"
  | "EXAM_PREP"
  | "BUSINESS_ENGLISH"
  | "NO_CAMERA"
  | "RECORDING_ALLOWED";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  timezone: string;
}

export interface Slot {
  id: string;
  hostId: string;
  hostName: string;
  title: string;
  description?: string;
  startAt: string;        // ISO 8601 UTC
  durationMinutes: number;
  format: SlotFormat;
  level: SlotLevel;
  markers: SlotMarker[];
  capacity?: number;      // только для ONLINE
  enrolledCount?: number; // только для ONLINE
  status: SlotStatus;
  location?: string;      // для OFFLINE
  // onlineLink не отдаётся в публичном календаре — только после записи
}