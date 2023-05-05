import { useLoginByTokenMutation } from 'hooks/generated/apolloHooks';
import { useGlobalLoader } from 'hooks/useGlobalLoader';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types/resolvers-types';
import { useUiContext } from './uiStore';

const defaultUserState = undefined as User | undefined;

const userContext = createContext(defaultUserState);

export function useUser() {
  return useContext(userContext);
}
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(defaultUserState);
  const [getUser, { data, error, loading }] = useLoginByTokenMutation();
  const { openMenu } = useUiContext();
  const { showLoader,hideLoader } = useGlobalLoader();

  useEffect(() => {
    if (loading) {
      showLoader();
    }else{
      hideLoader();
    }
  }, [hideLoader, loading, showLoader]);


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      getUser();
      return;
    }
    setUser(JSON.parse(user));
  }, [getUser]);

  useEffect(() => {
    if (!error && data?.loginByToken.__typename === 'User') {
      const user = data?.loginByToken;
      setUser(user);
      openMenu();
    }
  }, [data, error, openMenu]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
