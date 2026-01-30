import { createContext, useReducer, PropsWithChildren } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string, password: string}) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type AuthenticationState = {
 user: User | null;
 isAuthenticated: boolean;
}

type AuthAction =
 | { type: 'login', payload: User}
 | { type: 'logout' };


const initialState: AuthenticationState = {
 user: null,
 isAuthenticated: false,
}

function reducer(state: AuthenticationState, action: AuthAction) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: initialState.isAuthenticated,
      };

    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER: User = {
 name: "Donald",
 email: "donald@example.com",
 password: "321qwerty",
 avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: PropsWithChildren) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login({ email, password }: { email: string; password: string }) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext};