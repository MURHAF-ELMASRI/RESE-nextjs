import pitchTable from "../../Tables/pitchTable";

const pitchRepository = {
  get: async (id: String) => {
    return async () => pitchTable.find(id);
  },
  getAll: async () => {
    return async () => pitchTable.find();
  },
};

export default pitchRepository;
