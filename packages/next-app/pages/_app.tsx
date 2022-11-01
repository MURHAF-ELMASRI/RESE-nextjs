import TopLine from 'components/TopLine';

import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '../config/theme';
import SideBar from '../containers/SideBar/SideBar';
import { store } from '../state/store';
import '../styles/global.css';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '../config/createEmotionCache';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AnimatePresence exitBeforeEnter>
            <TopLine />
            <SideBar />
            <Component {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}

export default MyApp;
