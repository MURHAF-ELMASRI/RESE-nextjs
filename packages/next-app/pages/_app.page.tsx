import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TopLine from 'components/TopLine';
import { AlertProvider } from 'hooks/useAlert';
import { GlobalLoaderProvider } from 'hooks/useGlobalLoader';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { apolloClient } from '../config/appolloClient';
import createEmotionCache from '../config/createEmotionCache';
import { theme } from '../config/theme';
import SideBar from '../containers/SideBar/SideBar';
import '../styles/global.css';
import { UiProvider } from './uiStore';
import { UserProvider } from './userStore';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
          <AlertProvider>
            <UiProvider>
              <GlobalLoaderProvider>
                <UserProvider>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <CssBaseline />
                    <TopLine />

                    <div id="main-page">
                      <SideBar />
                      <Component {...pageProps} />
                    </div>
                  </LocalizationProvider>
                </UserProvider>
              </GlobalLoaderProvider>
            </UiProvider>
          </AlertProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default MyApp;
