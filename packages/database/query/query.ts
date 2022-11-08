import connectMongo from '../connectMongo';
import pitchTable from '../Tables/pitchTable';
import userTable from '../Tables/userTable';

export const query = {
  getPitches: async () => {
    await connectMongo();
    return pitchTable.find({}).lean();
  },
  getUser: async ({ email }: { email: string }) => {
    await connectMongo();
    return userTable.findOne({ email }, ['email', 'fullName', 'password']);
  },
};
export default query;
