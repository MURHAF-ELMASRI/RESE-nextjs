/* eslint-disable @typescript-eslint/no-empty-function */
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/system';
import { createContext, useCallback, useContext, useState } from 'react';

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
  const theme = useTheme();
  const hideLoader = useCallback(() => {
    setLoading(false);
  }, []);
  const showLoader = useCallback(() => {
    setLoading(true);
  }, []);

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
      ):null}
      {children}
    </globalLoaderContext.Provider>
  );
}
