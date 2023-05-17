import Paper from '@mui/material/Paper';
import { useAppSelector } from 'hooks/state';
import type { NextPage } from 'next';
import Link from 'next/link';
import { makeStyles } from 'tss-react/mui';

const Test: NextPage = () => {
  const { classes } = useStyle();
  const ui = useAppSelector((x) => x.ui.isSideBarOpen);

  return (
    <div className={classes.container}>
      <h3>Test Page</h3>
      <h1>{ui ? 'true' : 'false'}</h1>
      <div className={classes.navbar}>dummy nav bar</div>
      <div>
        <Link href={'/'}>index</Link>
      </div>
      <Paper className={classes.paper}>Here is the paper</Paper>
    </div>
  );
};

export default Test;

const useStyle = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    height: '100%',
    justifyContent: 'center',
  },
  navbar: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    height: '100%',
  },
}));
