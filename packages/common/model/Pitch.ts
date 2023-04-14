import { PitchId } from 'packages/next-app/types/nominal';

export type PaidService = 'referee';
export type FreeService = 'treat' | 'transportation' | 'counter';

export type Coord = [number, number];

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
