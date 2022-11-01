import { Link as LinkMUI, Typography } from '@mui/material';
import ButtonRese from 'components/ButtonRese';
import ImageRese from 'components/ImageRese';
import TextFieldRese from 'components/TextFieldRese';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import Logo from '../assets/logo.png';
import rectangle from '../assets/rectangle.png';
import { pageTransition } from '../util/const';

export default React.memo(Login);

function Login() {
  const { classes } = useStyles();
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (v) => {
      console.log('submit the values', v.email, v.password);
    },
  });

  const navigateToSignup = useCallback(() => {
    push('/signup');
  }, [push]);

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <ImageRese width={112} src={Logo} className={classes.logo} />

      <ImageRese width={200} src={rectangle} className={classes.leftRect} />

      <ImageRese width={270} src={rectangle} className={classes.rightRect} />

      <div className={classes.inputContainer}>
        <TextFieldRese
          title="Email"
          onChange={formik.handleChange}
          name="email"
          className={classes.input}
          variant="outlined"
          value={formik.values.email}
          type="email"
          formik
        />
        <div className={classes.passwordContainer}>
          <TextFieldRese
            title="Password"
            onChange={formik.handleChange}
            name="password"
            className={classes.passwordInput}
            variant="outlined"
            value={formik.values.password}
            type="password"
            formik
          />

          <LinkMUI textAlign="end" component={Link} href="/forget-password">
            <Typography className={classes.forgetPassword}>
              Forgot Password?
            </Typography>
          </LinkMUI>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <ButtonRese
          label="Login"
          icon="mdi:login-variant"
          onClick={() => {
            console.log('login');
          }}
        />

        <ButtonRese
          icon="mdi:google"
          color="gray"
          label="Login with google"
          onClick={() => {
            console.log('with google');
          }}
        />

        <ButtonRese
          icon="mdi:plus"
          label="Create New Account"
          onClick={() => {
            console.log('Create New Account');
          }}
        />
      </div>
    </motion.div>
  );
}

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 24px',
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
  input: {
    marginBottom: 24,
    width: '100%',
  },
  inputContainer: {
    maxWidth: 400,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 400,
    width: '100%',
  },
  passwordInput: {
    width: '100%',
  },
  passwordContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',

    width: '100%',
    marginBottom: 24,
  },
  forgetPassword: {
    textAlign: 'end',
    cursor: 'pointer',
    fontSize: 14,
  },
}));
