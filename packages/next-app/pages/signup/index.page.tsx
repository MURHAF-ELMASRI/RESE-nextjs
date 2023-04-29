import Box from '@mui/material/Box';
import juniorSoccer from 'assets/juniorSoccer.svg';
import Logo from 'assets/logo.png';
import rectangle from 'assets/rectangle.png';
import ButtonRese from 'components/ButtonRese';
import ImageRese from 'components/ImageRese';
import PhoneNumber from 'components/PhoneNumber';
import Select from 'components/Select';
import TextFieldRese from 'components/TextFieldRese';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { UserType, useSignupMutation } from 'hooks/generated/apolloHooks';
import { useAlert } from 'hooks/useAlert';
import useFlex from 'hooks/useFlex';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { pageTransition } from 'util/const';
import { formValidation } from './formValidation';

const SelectData: { title: string; value: UserType }[] = [
  { title: 'Player', value: 'player' },
  { title: 'Manger', value: 'manger' },
];

export default function Signup() {
  const { classes } = useStyles();

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <ImageRese maxWidth={200} src={rectangle} className={classes.leftRect} />

      <ImageRese maxWidth={270} src={rectangle} className={classes.rightRect} />
      <LeftSide />
      <Box flex={1} className={classes.rightSideContainer}>
        <ImageRese
          maxWidth={700}
          src={juniorSoccer}
          className={classes.juniorSoccer}
        />
      </Box>
    </motion.div>
  );
}
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  type: 'player' as undefined | UserType,
};

function LeftSide() {
  const { classes } = useStyles();
  const { push } = useRouter();
  const [mutate, result] = useSignupMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { column4 } = useFlex();
  const { alert } = useAlert();

  const formik = useFormik({
    validationSchema: formValidation,
    initialValues,
    onSubmit: async (signUpInput, helper) => {
      const variables = omit(signUpInput, 'confirmPassword');
      const result = await mutate({ variables: { signUpInput: variables } });
      if (result.data?.signup?.__typename !== 'SignupError') {
        return push('/login');
      }
      if (result.data.signup.email) {
        helper.setFieldError('email', result.data.signup.email);
        return;
      }
      if (result.data.signup.phone) {
        helper.setFieldError('phone', result.data.signup.phone);
        return;
      }

      alert('error', 'something went wrong');

      return;
    },
  });

  return (
    <Box flex={1}>
      <Box display={'flex'} flexDirection={'column'} ml={12}>
        <div className={classes.logoContainer}>
          <ImageRese maxWidth={112} src={Logo} className={classes.logo} />
        </div>
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
              !!formik.touched.confirmPassword &&
              !!formik.errors.confirmPassword
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
        <div className={classes.buttonContainer}>
          <ButtonRese
            label="Submit"
            icon="mdi:login-variant"
            onClick={()=>{
              console.log(formik.values)
              formik.submitForm()}}
            disabled={result.loading}
          />
        </div>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    width: '100%',
  },

  logo: {
    marginTop: 60,
    maxWidth: 112,
    marginBottom: 24,
    zIndex: 10,
  },
  leftRect: {
    position: 'absolute',
    left: -120,
    top: 0,
  },
  rightRect: {
    position: 'absolute',
    right: -180,
    top: 300,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 400,
    width: '100%',
  },
  logoContainer: {
    width: 108,
    display: 'flex',
  },
  rightSideContainer: {
    display: 'flex',
    backgroundColor: theme.palette.grey[100],
    borderLeft: `3px solid ${theme.palette.divider}`,
  },
  juniorSoccer: {
    width: '100%',
  },
}));
