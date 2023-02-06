import { place } from "./place";

export interface match {
  title: string;
  date: string;
  time: number;
  place: place,
  sports: string,
  type: string;
  detail: string,
  hostId: number,
  hostNickName: string,
  registTime: string,
  memberList?: number[] | null,
}