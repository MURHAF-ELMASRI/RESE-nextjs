import create from '@rese/database/create/create';
import query from '@rese/database/query/query';
import bcrypt from 'bcrypt';
import sendConfirmationEmail from 'pages/api/services/mail/sendConfirmation';
import { MutationResolvers } from 'types/resolvers-types';
import { formValidation } from './formValidation';

export const signup: MutationResolvers['signup'] = async (_, args) => {
  try {
    const { signUpInput } = args;
    await formValidation.validate(signUpInput);
    const data = await query.getUserByEmail(signUpInput);
    console.log(data);
    if (data) {
      return {
        __typename: 'SignupError',
        email: 'Email already exists',
        params: {
          ok: false,
          status: 400,
        },
      };
    }

    const userByPhone = await query.getUserByPhone(signUpInput);
    if (userByPhone) {
      return {
        __typename: 'SignupError',
        phone: 'Phone already exists',
        params: {
          ok: false,
          status: 400,
        },
      };
    }

    const salt = await bcrypt.genSalt(10);
    signUpInput.password = await bcrypt.hash(signUpInput.password, salt);

    const confirmationCode = '698506';

    await create.createUser({
      ...signUpInput,
      type: signUpInput.type,
      salt,
      status: 'pending',
      confirmationCode,
      confirmationCodeDate: new Date(),
    });

    sendConfirmationEmail(
      signUpInput.fullName,
      signUpInput.email,
      confirmationCode
    );

    return null;
  } catch (err: any) {
    console.log(err.message);
    return {
      __typename: 'SignupError',
      params: {
        ok: false,
        status: 400,
      },
    };
  }
};
