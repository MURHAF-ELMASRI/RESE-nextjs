import { UserType } from '@rese/common/model/User';
import userTable from '../Tables/userTable';
import connectMongo from '../connectMongo';

type Obj<T> = {
  [K in keyof T]: (args: T[K] & { _id: string }) => Promise<T[K]>;
};

type RemoveId<T> = {
  [K in keyof T]: T[K] extends (args: infer U) => infer V
    ? (args: Omit<U, '_id'>) => V
    : T[K];
};

function createCreate<T>(o: Obj<T>): RemoveId<Obj<T>> {
  return o as any;
}

const create = {
  createUser: async (user: Omit<UserType,"_id">): Promise<UserType> => {
    await connectMongo();
    console.log("user",user);
    
    return userTable.create(user);
  },
};

export default createCreate(create);

