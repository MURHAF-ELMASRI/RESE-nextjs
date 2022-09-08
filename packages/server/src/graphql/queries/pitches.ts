import { pitchQL } from "../types/pitch";
import { QueryType } from "./query";

const pitches: QueryType = {
  type: pitchQL,
  resolve: async (_, __, context) => {
    return await context.repositories.pitch.getAll();
  },
};

export default pitches;
