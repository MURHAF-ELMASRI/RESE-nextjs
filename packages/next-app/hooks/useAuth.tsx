import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

interface User {
  email: string;
  name: string;
  token: string;
  lang: 'en' | 'ar' | 'tr';
}

interface ContextType {
  user: User;
  setUser: (user: Partial<User>) => void;
}

const initialUser: User = {
  email: '',
  name: '',
  token: '',
  lang: 'en',
};

const authContext = createContext<ContextType | null>(null);

export const useAuth = useContext(authContext);

interface Props {
  children: React.ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [user, setUserValue] = useState<User>(initialUser);

  const setUser = useCallback((user: Partial<User>) => {
    setUserValue((prev) => ({ ...prev, ...user }));
  }, []);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
