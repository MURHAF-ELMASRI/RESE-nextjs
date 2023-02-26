/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useCallback, useContext, useState } from 'react';

const defaultUiState = {
  isMenuOpen: false,
};

const uiContext = createContext({
  uiState: defaultUiState,
  toggleMenu: () => {},
  openMenu: () => {},
});

export function useUiContext() {
  return useContext(uiContext);
}
export function UiProvider({ children }: { children: React.ReactNode }) {
  const [uiState, setUiState] = useState(defaultUiState);

  const toggleMenu = useCallback(() => {
    setUiState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  const openMenu = useCallback(() => {
    console.log('openMenu');
    
    setUiState((prev) => ({ ...prev, isMenuOpen: true }));
  }, []);

  return (
    <uiContext.Provider value={{ uiState, toggleMenu, openMenu }}>
      {children}
    </uiContext.Provider>
  );
}
