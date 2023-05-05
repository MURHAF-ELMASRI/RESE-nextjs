import connectMongo from '../connectMongo';
import userTable from '../Tables/userTable';

const update = {
  confirmCode: async (data: { _id: string; confirmCode: string }) => {
    await connectMongo();
    return userTable.updateOne(
      { _id: data._id },
      { $set: { confirmCode: data.confirmCode, status: 'active' } }
    );
  },
};

export default update;
