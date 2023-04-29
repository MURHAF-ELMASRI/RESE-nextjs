import * as yup from 'yup';

export const formValidation = yup.object({
  fullName: yup.string().required(),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  phone: yup
    .string()
    .min(10, 'Phone number should be of minimum 10 characters length')
    .required().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Must be only digits"),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  type: yup.string().required(),
});

