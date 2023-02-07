import { place } from "./place";

export interface match {
  title: string;
  description?: string,
  sports: string,
  gameType: string,
  place: place,
  startDate: string,
  startTime: string,
  playTime: string,
  level: string,
  sex: string,
  people: number,
  hostId: number,
  memberGatheringList?: number[],
}