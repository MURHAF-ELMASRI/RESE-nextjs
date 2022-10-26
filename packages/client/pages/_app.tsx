import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "../config/theme";
import SideBar from "../containers/SideBar/SideBar";
import { store } from "../state/store";
import createEmotionCache from "../util/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <AnimatePresence exitBeforeEnter>
            <SideBar />
            <Component {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
    </ReduxProvider>
  );
}

export default MyApp;
