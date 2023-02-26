/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useCallback, useContext, useState } from 'react';

const defaultUiState = {
  isMenuOpen: false,
};

const uiContext = createContext({
  uiState: defaultUiState,
  toggleMenu: () => {},
});

export function useUiContext() {
  return useContext(uiContext);
}
export function UiProvider({ children }: { children: React.ReactNode }) {
  const [uiState, setUiState] = useState(defaultUiState);

  const toggleMenu = useCallback(() => {
    setUiState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  return (
    <uiContext.Provider value={{ uiState, toggleMenu }}>
      {children}
    </uiContext.Provider>
  );
}
