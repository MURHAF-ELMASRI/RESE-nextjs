import type { PitchType } from '@rese/common/model/Pitch';
import mongoose from 'mongoose';

const pitchModel = new mongoose.Schema<PitchType>({
  mangerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: [Number, Number],
  },
  numberOfSubPitch: {
    type: Number,
  },
  openAt: {
    type: Number,
  },
  closeAt: {
    type: Number,
  },
  paidServices: {
    type: Array,
  },
  freeServices: {
    type: Array,
  },
});

export default mongoose.model('pitches', pitchModel);
