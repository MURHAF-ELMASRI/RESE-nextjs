import Box from '@mui/material/Box';
import juniorSoccer from 'assets/juniorSoccer.svg';
import Logo from 'assets/logo.png';
import rectangle from 'assets/rectangle.png';
import ImageRese from 'components/ImageRese';
import Transition from 'components/Transition';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useUser } from 'pages/userStore';
import { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { pageTransition } from 'util/const';
import ConfirmationStep from './ConfirmationStep';
import UserInfoStep from './UserInfoStep';
import { useSignupStore } from './useSignupStore';

export default function Signup() {
  const { classes } = useStyles();
  const { page } = useSignupStore();
  const user = useUser();
  const { replace } = useRouter();

  useEffect(() => {
    if (user) {
      replace('/');
    }
  }, [replace, user]);

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <ImageRese maxWidth={200} src={rectangle} className={classes.leftRect} />
      <ImageRese maxWidth={270} src={rectangle} className={classes.rightRect} />

      <Box flex={1}>
        <Box display={'flex'} flexDirection={'column'} ml={12}>
          <div className={classes.logoContainer}>
            <ImageRese maxWidth={112} src={Logo} className={classes.logo} />
          </div>
          {
            <Transition animate="slide" controlKey={page}>
              {page === 0 ? <UserInfoStep /> : <ConfirmationStep />}
            </Transition>
          }
        </Box>
      </Box>

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
