import { useLoginByTokenMutation } from 'hooks/generated/apolloHooks';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types/resolvers-types';
import { useUiContext } from './uiStore';

const defaultUserState = undefined as User | undefined;

const userContext = createContext(defaultUserState);

export function useUserContext() {
  return useContext(userContext);
}
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(defaultUserState);
  const [getUser, { data, error }] = useLoginByTokenMutation();
  const { openMenu } = useUiContext();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      getUser();
      return;
    }
    setUser(JSON.parse(user));
  }, [getUser]);

  useEffect(() => {
    console.log({ data, error });

    if (!error && data?.loginByToken.__typename === 'User') {
      const user = data?.loginByToken;
      setUser(user);
      openMenu();
    }
  }, [data, error, openMenu]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
