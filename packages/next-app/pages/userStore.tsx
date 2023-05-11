import { useLoginByTokenMutation } from 'hooks/generated/apolloHooks';
import { useGlobalLoader } from 'hooks/useGlobalLoader';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from 'types/resolvers-types';
import { useUiContext } from './uiStore';

interface DefaultUserState {
  user?: User;
  fetchUserToStore: () => void;
}

const defaultUserState: DefaultUserState = {
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  fetchUserToStore: () => {},
};

const userContext = createContext(defaultUserState);

export function useUser() {
  return useContext(userContext);
}
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [getUser, { loading }] = useLoginByTokenMutation();
  const { openMenu } = useUiContext();
  const { showLoader, hideLoader } = useGlobalLoader();

  const fetchUserToStore = useCallback(async () => {
    const user = await getUser();
    if (user.data?.loginByToken.__typename === 'User') {
      setUser(user.data.loginByToken);
      openMenu();
    }
  }, [getUser, openMenu]);

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
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
  }, [getUser, setUser]);

  useEffect(() => {
    fetchUserToStore();
  }, [fetchUserToStore, openMenu]);

  return (
    <userContext.Provider value={{ user, fetchUserToStore }}>
      {children}
    </userContext.Provider>
  );
}
