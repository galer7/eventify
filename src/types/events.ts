import { Doctor, Event } from "@prisma/client";

export type TypeSafeEvent = Event & { doctors: Doctor[]; startDate: string };
