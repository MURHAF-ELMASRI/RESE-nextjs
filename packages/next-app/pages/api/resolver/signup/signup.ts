import create from '@rese/database/create/create';
import query from '@rese/database/query/query';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import sendConfirmationEmail from 'pages/api/services/mail/sendConfirmation';
import { MutationResolvers } from 'types/resolvers-types';
import { formValidation } from './formValidation';

const TOKEN_EXPIRATION_IN_SC = 60;

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  try {
    const { signUpInput } = args;
    await formValidation.validate(signUpInput);
    const data = await query.getUserByEmail(signUpInput);
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
    
    const user = await create.createUser({
      ...signUpInput,
      type: signUpInput.type,
      salt,
      status: 'pending',
      confirmationCode,
      confirmationCodeDate: new Date(),
    });

    const token = jsonwebtoken.sign(
      { _id: user._id },
      process.env.JWT_SECRET ?? 'secret',
      {
        expiresIn: TOKEN_EXPIRATION_IN_SC,
      }
    );

    const expiresIn = new Date(Date.now() + TOKEN_EXPIRATION_IN_SC * 1000);

    context.res.setHeader(
      'Set-Cookie',
      `token=${token};Max-Age=${expiresIn.toUTCString()};path=/`
    );

    sendConfirmationEmail(
      signUpInput.fullName,
      signUpInput.email,
      confirmationCode
    );

    return null;
  } catch (err: any) {
    console.log(err);
    return {
      __typename: 'SignupError',
      params: {
        ok: false,
        status: 400,
      },
    };
  }
};
