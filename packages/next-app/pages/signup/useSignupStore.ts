import { create } from 'zustand';

type Page = 0 | 1;
interface State {
  page: Page;
  setPage: (page: Page) => void;
}

export const useSignupStore = create<State>()((set) => ({
  page: 0 ,
  setPage: (page) => set(() => ({ page })),
}));
