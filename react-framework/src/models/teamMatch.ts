import { place } from "./place";

export interface teamMatch {
  distance: number,
  matchDate: string,
  maxStartTime: string,
  minStartTime: string,
  preferredPlace: place,
  teamMatchResultList: any,
}