import makeStyles from '@material-ui/core/styles/makeStyles';
import ButtonRese from 'components/ButtonRese';
import ImageRese from 'components/ImageRese';
import TextFieldRese from 'components/TextFieldRese';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Logo from '../assets/logo.png';
import rectangle from '../assets/rectangle.png';
import { pageTransition } from '../util/const';

export default React.memo(Login);

function Login() {
  const classes = useStyle();
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
        />
        <TextFieldRese
          title="Password"
          onChange={formik.handleChange}
          name="password"
          className={classes.input}
          variant="outlined"
          value={formik.values.password}
        />
      </div>

      <div className={classes.buttonContainer}>
        <ButtonRese
          color="primary"
          label="Login"
          onClick={() => {
            console.log('login');
          }}
        />
        {/*         

        <ButtonRese
          color="default"
          variant="contained"
          className={classes.buttonGray}
          
        >
          Login with google
        </ButtonRe>
        <Button
          color="primary"
          variant="contained"
          className={classes.buttonGreen}
          onClick={navigateToSignup}
          startIcon={
            <Icon className={classes.icon} icon="mdi:plus" width={24} />
          }
        >
          Sign Up
        </Button> */}
      </div>
    </motion.div>
  );
}

const useStyle = makeStyles((theme) => ({
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
}));
