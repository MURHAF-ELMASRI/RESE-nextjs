import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';

export default memo(TopLine);

function TopLine() {
  const { classes } = useStyles();
  return <div className={classes.topLine} />;
}

const useStyles = makeStyles()((theme) => ({
  topLine: {
    width: '100%',
    height: 6,
    background: theme.palette.primary.main,
    zIndex: 10,
  },
}));
