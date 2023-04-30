import { create } from 'zustand';

type Page = 'UserInfo' | 'confirmation';
interface State {
  page: Page;
  setPage: (page: Page) => void;
}

export const useSignupStore = create<State>()((set) => ({
  page: 'confirmation' as Page,
  setPage: (page) => set(() => ({ page })),
}));
