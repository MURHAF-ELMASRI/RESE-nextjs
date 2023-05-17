import { PitchId } from 'packages/next-app/types/nominal';
import { Coord } from '../types/Coord';

export type PaidService = 'referee';
export type FreeService = 'treat' | 'transportation' | 'counter';


export type PitchType = {
  _id: PitchId;
  mangerId: string;
  name: string;
  numberOfSubPitch: number;
  openAt: number;
  closeAt: number;
  location: Coord;
  paidServices?: PaidService[];
  freeServices?: FreeService[];
  thumbnailUrl: string;
  phoneNumber: string;
  email: string;
};
