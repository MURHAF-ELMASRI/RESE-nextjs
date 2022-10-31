import { ThemeProvider } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '../config/theme';
import SideBar from '../containers/SideBar/SideBar';
import { store } from '../state/store';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyle();

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>

        <AnimatePresence exitBeforeEnter>
        <div className={classes.upLine} />
          <SideBar />
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default MyApp;
const useStyle = makeStyles((theme) => ({
  upLine: {
    width: '100%',
    height: 6,
    background: theme.palette.primary.main,
    zIndex: 10,
  },
}));
