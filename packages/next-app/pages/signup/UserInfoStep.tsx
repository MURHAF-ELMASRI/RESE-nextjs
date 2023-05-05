import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ButtonRese from 'components/ButtonRese';
import PhoneNumber from 'components/PhoneNumber';
import Select from 'components/Select';
import TextFieldRese from 'components/TextFieldRese';
import { useFormik } from 'formik';
import { useSignupMutation } from 'hooks/generated/apolloHooks';
import { useAlert } from 'hooks/useAlert';
import useFlex from 'hooks/useFlex';
import { omit } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { UserType } from 'types/resolvers-types';
import { formValidation } from './formValidation';
import { useSignupStore } from './useSignupStore';

const SelectData: { title: string; value: UserType }[] = [
  { title: 'Player', value: 'player' },
  { title: 'Manger', value: 'manger' },
];

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  type: 'player' as undefined | UserType,
};

export default React.memo(UserInfoStep);

function UserInfoStep() {
  const { classes } = useStyles();
  const { replace } = useRouter();
  const [mutate, result] = useSignupMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { column4 } = useFlex();
  const { alert } = useAlert();
  const { setPage } = useSignupStore();

  const formik = useFormik({
    validationSchema: formValidation,
    initialValues,
    onSubmit: async (signUpInput, helper) => {
      const variables = omit(signUpInput, 'confirmPassword');
      const result = await mutate({ variables: { signUpInput: variables } });
      if (result.data?.signup?.__typename !== 'SignupError') {
        console.log('success');
        return setPage(1)
      }
      console.log('error');
      //TODO: fix this small ts error
      helper.setErrors(result.data.signup);

      alert('error', 'something went wrong');

      return;
    },
  });

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box className={column4} maxWidth={400} width="100%">
        <TextFieldRese
          title="Full Name"
          onChange={formik.handleChange}
          name="fullName"
          variant="outlined"
          value={formik.values.fullName}
          type="fullName"
          helperText={formik.errors.fullName}
          showError={!!formik.touched.fullName && !!formik.errors.fullName}
        />
        <TextFieldRese
          title="Email"
          onChange={formik.handleChange}
          name="email"
          variant="outlined"
          value={formik.values.email}
          type="email"
          helperText={formik.errors.email}
          showError={!!formik.touched.email && !!formik.errors.email}
        />
        <PhoneNumber
          onChange={formik.handleChange('phone')}
          value={formik.values.phone}
          helperText={formik.errors.phone}
          showError={!!formik.touched.phone && !!formik.errors.phone}
        ></PhoneNumber>
        <TextFieldRese
          title="Password"
          onChange={formik.handleChange}
          name="password"
          variant="outlined"
          value={formik.values.password}
          type={showPassword ? 'password' : 'text'}
          helperText={formik.errors.password}
          showError={!!formik.touched.password && !!formik.errors.password}
          icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
          iconClick={() => setShowPassword(!showPassword)}
        />
        <TextFieldRese
          title="Confirm Password"
          onChange={formik.handleChange}
          name="confirmPassword"
          variant="outlined"
          value={formik.values.confirmPassword}
          type={showConfirmPassword ? 'password' : 'text'}
          helperText={formik.errors.confirmPassword}
          showError={
            !!formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
          iconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <Select
          data={SelectData}
          value={formik.values.type}
          label="User Type"
          onChange={formik.handleChange}
          name="type"
          helperText={formik.errors.type}
          showError={!!formik.touched.type && !!formik.errors.type}
        />
      </Box>
      <div>
        <Box className={column4} maxWidth={400} width="100%">
          <Typography>
            You already have account{' '}
            <NextLink href={'/login'}>
              <Link className={classes.link}>login</Link>
            </NextLink>
          </Typography>
          <ButtonRese
            label="Submit"
            icon="mdi:login-variant"
            onClick={formik.handleSubmit}
            disabled={result.loading}
          />
        </Box>
      </div>
    </Box>
  );
}

const useStyles = makeStyles()(() => ({
  link:{
    cursor:'pointer'
  }
}));
