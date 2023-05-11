/* eslint-disable @typescript-eslint/no-empty-function */
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/system';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const defaultGlobalLoaderState = {
  showLoader: () => {},
  hideLoader: () => {},
};

const globalLoaderContext = createContext(defaultGlobalLoaderState);

export const useGlobalLoader = () => useContext(globalLoaderContext);

export function GlobalLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const hideLoader = useCallback(() => {
    setLoading(false);
  }, []);
  const showLoader = useCallback(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && showLoader();
    const handleComplete = (url: string) =>
      url === router.asPath && hideLoader();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [hideLoader, router.asPath, router.events, showLoader]);

  return (
    <globalLoaderContext.Provider value={{ hideLoader, showLoader }}>
      {loading ? (
        <Box
          display={'flex'}
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          bgcolor={theme.palette.background.paper}
          zIndex={1000}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {children}
    </globalLoaderContext.Provider>
  );
}
