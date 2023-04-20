import Box from '@mui/material/Box';
import Logo from 'assets/logo.png';
import rectangle from 'assets/rectangle.png';
import ButtonRese from 'components/ButtonRese';
import ImageRese from 'components/ImageRese';
import PhoneNumber from 'components/PhoneNumber';
import TextFieldRese from 'components/TextFieldRese';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useLoginMutation } from 'hooks/generated/apolloHooks';
import useFlex from 'hooks/useFlex';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { pageTransition } from 'util/const';
import { formValidation } from './formValidation';

export default React.memo(Login);

function Login() {
  const { classes } = useStyles();
  const { push } = useRouter();
  const [mutate, result] = useLoginMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { column } = useFlex();

  const formik = useFormik({
    validationSchema: formValidation,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (v, helper) => {
      console.log('submitting');

      try {
        const { data } = await mutate({ variables: v });
        console.log({ data });
        if (!data) {
          //TODO: show global error if there no data - or for server errors and bad request
          return;
        }

        if (data?.login.__typename === 'LoginError') {
          return helper.setErrors({
            email: data.login.emailField ?? '',
            password: data.login.password ?? '',
          });
        }
        const a = data.login.status;

        // dispatch(setUser({ ...data.login }));
        push('/');
      } catch (e) {
        return;
      }
    },
  });

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <div className={classes.logoContainer}>
        <ImageRese width={112} src={Logo} className={classes.logo} />
      </div>
      <ImageRese width={200} src={rectangle} className={classes.leftRect} />

      <ImageRese width={270} src={rectangle} className={classes.rightRect} />

      <Box className={column} maxWidth={400} width="100%">
        <TextFieldRese
          title="Name"
          onChange={formik.handleChange}
          name="name"
          variant="outlined"
          value={formik.values.name}
          type="name"
          helperText={formik.errors.name}
          touched={formik.touched.name}
        />

        <TextFieldRese
          title="Email"
          onChange={formik.handleChange}
          name="email"
          variant="outlined"
          value={formik.values.email}
          type="email"
          helperText={formik.errors.email}
          touched={formik.touched.email}
        />

        <PhoneNumber value={formik.values.phone}></PhoneNumber>

        <TextFieldRese
          title="Password"
          onChange={formik.handleChange}
          name="password"
          variant="outlined"
          value={formik.values.password}
          type={showPassword ? 'password' : 'text'}
          helperText={formik.errors.password}
          touched={formik.touched.password}
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
          touched={formik.touched.confirmPassword}
          icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
          iconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </Box>

      <div className={classes.buttonContainer}>
        <ButtonRese
          label="Submit"
          icon="mdi:login-variant"
          onClick={formik.submitForm}
          disabled={result.loading}
        />
      </div>
    </motion.div>
  );
}

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 96px',
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
}));
