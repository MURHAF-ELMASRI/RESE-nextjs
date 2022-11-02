import * as yup from 'yup';

export const formValidation = yup.object({
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

