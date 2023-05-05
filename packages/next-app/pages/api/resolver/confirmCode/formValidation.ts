import * as yup from 'yup';

export const formValidation = yup.object({
  code: yup.string().length(6).required('Confirmation code is required'),
});

