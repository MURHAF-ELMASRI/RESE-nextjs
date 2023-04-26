/* eslint-disable @typescript-eslint/no-empty-function */
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useCallback, useContext, useState } from 'react';

const defaultAlertState = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  alert: (variants: Variants, message: string) => {},
  hideAlert: () => {},
};

const alertContext = createContext(defaultAlertState);

export function useAlert() {
  return useContext(alertContext);
}
type Variants = 'success' | 'error' | 'warning' | 'info';

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<Variants>('error');

  const hideAlert = useCallback(() => {
    setIsAlertOpen(false);
  }, []);

  const alert = useCallback((variants: Variants, message: string) => {
    setIsAlertOpen(true);
    setMessage(message);
    setVariant(variants);
  }, []);

  const handleClose = useCallback(() => {
    setIsAlertOpen(false);
  }, []);

  return (
    <alertContext.Provider value={{ alert, hideAlert }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isAlertOpen}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </alertContext.Provider>
  );
}
