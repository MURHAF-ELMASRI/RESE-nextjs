import TopLine from 'components/TopLine';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { apolloClient } from '../config/appolloClient';
import createEmotionCache from '../config/createEmotionCache';
import { theme } from '../config/theme';
import SideBar from '../containers/SideBar/SideBar';
import '../styles/global.css';

import { wrapper } from 'state/store';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopLine />
          <div id="main-page">
            <SideBar />
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
