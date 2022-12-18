import connectMongo from '../connectMongo';
import pitchTable from '../Tables/pitchTable';
import userTable from '../Tables/userTable';

export const query = {
  getPitches: async () => {
    await connectMongo();
    return pitchTable.find({}).lean();
  },
  //TODO : return the types of the query according to requested dataField
  getUser: async ({ email }: { email: string }) => {
    await connectMongo();
    return userTable.findOne({ email }, [
      'email',
      'fullName',
      'password',
      'phone',
      'status',
    ] as const);
  },
};
export default query;
