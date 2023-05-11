import connectMongo from '../connectMongo';
import pitchTable from '../Tables/pitchTable';
import userTable from '../Tables/userTable';

export const query = {
  getPitches: async () => {
    await connectMongo();
    return pitchTable.find({}).lean();
  },
  //TODO : return the types of the query according to requested dataField
  getUserByEmail: async ({ email }: { email: string }) => {
    await connectMongo();
    return userTable.findOne({ email }, [
      'email',
      'fullName',
      'password',
      'phone',
      'status',
    ] as const);
  },
  getUserByPhone: async ({ phone }: { phone: string }) => {
    await connectMongo();
    return userTable.findOne({ phone }, [
      'email',
      'fullName',
      'password',
      'phone',
      'status',
    ] as const);
  },
  getUserByToken: async (_id: string) => {
    await connectMongo();
    try {
      return userTable
        .findOne({ _id })
        .lean();
    } catch (e) {
      console.error(e);
    }
  },
};
export default query;
