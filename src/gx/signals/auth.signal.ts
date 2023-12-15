import { User } from "@/entities/user.entity";
import { createSignal } from "@dilane3/gx";

export type AuthState = {
  user: User | null;
  loaded: boolean;
  loading: boolean;
};

export type AuthActions = {
  login: (user: any) => void;
  logout: () => void;
  setIsLoading: (loading: boolean) => void;
};

const authSignal = createSignal<AuthState>({
  name: "auth",
  state: {
    user: null,
    loaded: false,
    loading: false,
  },
  actions: {
    login: (state, user) => {
      return {
        ...state,
        user,
        loaded: true,
        loading: false,
      };
    },
    logout: (state) => {
      return {
        ...state,
        user: null,
        loaded: false,
        loading: false,
      };
    },
    setIsLoading: (state, loading: boolean) => {
      return {
        ...state,
        loading,
      };
    },
  },
});

export default authSignal;
