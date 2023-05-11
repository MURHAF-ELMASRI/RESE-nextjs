import update from '@rese/database/update/update';
import moment from 'moment';
import getUserByToken from 'pages/api/util/getUserByToken';
import { MutationResolvers } from 'types/resolvers-types';
import { formValidation } from './formValidation';

export const confirmCode: MutationResolvers['confirmCode'] = async (
  _,
  args,
  context
) => {
  try {
    const { confirmCodeInput } = args;
    await formValidation.validate(confirmCodeInput);
    console.log(context.req.cookies);
    
    const user = await getUserByToken(context.req.cookies.token);
    if (!user) {
      console.log("17")

      throw new Error();
    }
    if (moment(user.confirmationCodeDate).isBefore(moment())) {
      console.log("20",user.confirmationCode, confirmCodeInput.code)

      return {
        __typename: 'ConfirmCodeError',
        params: {
          ok: false,
          status: 401,
          message: 'Confirmation code expired',
        },
      };
    }
    if(user.confirmationCode !== confirmCodeInput.code) {
      console.log("30",user, confirmCodeInput.code)
      return {
        __typename: 'ConfirmCodeError',
        params: {
          ok: false,
          status: 401,
          message: 'Confirmation code is not valid',
        },
      };
    }


    await update.confirmCode({
      _id: user._id,
      confirmCode: confirmCodeInput.code,
    });

    return null;
  } catch (err: any) {
    console.log(err);
    
    return {
      __typename: 'ConfirmCodeError',
      params: {
        ok: false,
        status: 400,
        message:"Something went wrong"
      },
    };
  }
};
