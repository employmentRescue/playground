import { place } from "./place";

export interface teamMatch {
  distance: number,
  matchGameType: string,
  matchDate: string,
  maxStartTime: string,
  minStartTime: string,
  preferredPlace: place,
  teamMatchResultList: any,
  matchSports: string,
}