import { v4 as uuidv4 } from "uuid";
import pitchTable from "../../Tables/pitchTable";

export type CreatePitchArgs = {
  name: string;
  location: string;
  openAt: number;
  closeAt: number;
  mangerId: string;
  numberOfSubPitches: number;
  paidServices: string[];
  freeServices: string[];
};

const pitchRepository = {
  get: async (id: String) => {
    return async () => pitchTable.find(id);
  },
  getAll: async () => {
    return pitchTable.find({});
  },
  //TODO : add authentication
  create: async (data: CreatePitchArgs) => {
    const _id = uuidv4();
    const newDoc = await pitchTable.create({ _id, ...data });
    return newDoc
  },
};

export default pitchRepository;
