import type { UserTypeType } from "@rese/common/model/User";

// required data for signup
export type SignupProps = {
  fullName: string;
  password: string;
  password2: string;
  phone: number;
  email: string;
  userType: UserTypeType;
};
