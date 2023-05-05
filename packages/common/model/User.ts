import { UserStatus, UserType as UserTypeType } from "packages/next-app/types/resolvers-types";


export interface UserType {
  _id: string;
  fullName: string;
  password: string;
  salt: string;
  phone: string;
  email: string;
  type: UserTypeType;
  status: UserStatus
  confirmationCode?: string
  confirmationCodeDate?:Date
}
