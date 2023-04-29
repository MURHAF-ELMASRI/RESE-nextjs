import Box from '@mui/material/Box';
import juniorSoccer from 'assets/juniorSoccer.svg';
import rectangle from 'assets/rectangle.png';
import ImageRese from 'components/ImageRese';
import { motion } from 'framer-motion';
import { makeStyles } from 'tss-react/mui';
import { pageTransition } from 'util/const';
import LeftSide from './LeftSide';

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
