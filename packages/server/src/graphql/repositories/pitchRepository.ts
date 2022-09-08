import pitchTable from "../../Tables/pitchTable";

const pitchRepository = {
  get: async (id: String) => {
    return async () => pitchTable.find(id);
  },
};

export default pitchRepository;
