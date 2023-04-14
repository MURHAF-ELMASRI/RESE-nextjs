import { PitchType } from '@rese/common/model/Pitch';
import { create } from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  selectedPitch?: PitchType ;
}

type Actions = {
  selectPitch: (pitch: PitchType|undefined) => void;
}

export const useIndex = create(immer<State & Actions>((set) => ({
  selectedPitch: undefined,
  selectPitch: (pitchId: PitchType) => {
    set((state) => {
      state.selectedPitch = pitchId;
    });
  }
})));

