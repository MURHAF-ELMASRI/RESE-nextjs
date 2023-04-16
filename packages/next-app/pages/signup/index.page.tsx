import Logo from 'assets/logo.png';
import rectangle from 'assets/rectangle.png';
import ButtonRese from 'components/ButtonRese';
import ImageRese from 'components/ImageRese';
import TextFieldRese from 'components/TextFieldRese';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useLoginMutation } from 'hooks/generated/apolloHooks';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { pageTransition } from 'util/const';
import { formValidation } from './formValidation';

export default React.memo(Login);

function Login() {
  const { classes } = useStyles();
  const { push } = useRouter();
  const [mutate, result] = useLoginMutation();

  const formik = useFormik({
    validationSchema: formValidation,
    initialValues: {
      email: '',
      password: '',
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

  const navigateToSignup = useCallback(() => {
    push('/signup');
  }, [push]);

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <div className={classes.logoContainer}>
        <ImageRese width={112} src={Logo} className={classes.logo} />
      </div>
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
          helperText={formik.errors.email}
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
            touched={formik.touched.password}
            helperText={formik.errors.password}
            showError
            formik
          />

          {/* <LinkMUI textAlign="end" component={Link} href="/forget-password">
            <Typography className={classes.forgetPassword}>
              Forgot Password?
            </Typography>
          </LinkMUI> */}
        </div>
      </div>

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
  logoContainer:{
    width:108,
    display: 'flex',
  }
}));
