import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "../config/theme";
import SideBar from "../containers/SideBar/SideBar";
import { store } from "../state/store";
import createEmotionCache from "../util/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: any) {
  return (
    <ReduxProvider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <AnimatePresence exitBeforeEnter>
            <SideBar />
            <Component {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}

export default MyApp;
