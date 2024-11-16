import {create} from 'zustand';

interface AuthState {
  loggedIn: boolean;
  user: { email: string } | null;
  login: (user: { email: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  user: null,
  login: (user) => set({ loggedIn: true, user }),
  logout: () => set({ loggedIn: false, user: null }),
}));

export default useAuthStore;
