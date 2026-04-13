import { createContext, useReducer, PropsWithChildren, useEffect } from "react";
import { supabase } from "../services/supabase";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  signup: ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// export type User = {
//   name: string;
//   email: string;
//   password: string;
//   avatar: string;
// };

type AuthenticationState = {
 user: User | null;
 isAuthenticated: boolean;
 isLoading: boolean;
}

type AuthAction =
 | { type: 'login', payload: User }
 | { type: 'logout' }
 | { type: 'loading_done' }
 | { type: 'signup' }


const initialState: AuthenticationState = {
 user: null,
 isAuthenticated: false,
 isLoading: true,
}

function reducer(state: AuthenticationState, action: AuthAction) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: initialState.isAuthenticated,
        isLoading: false,
      };

    case "signup":
      return {
        ...state,
        user: null,
        isAuthenticated: initialState.isAuthenticated,
        isLoading: false,
      };

    default:
     console.log("Supabase sent an unhandled action:", action.type);
     return state;
  }
}

function AuthProvider({ children }: PropsWithChildren) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        dispatch({ type: "login", payload: session.user });
      }
      dispatch({ type: "loading_done" });
    }

    getSession();

    // Listen for Auth Changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({ type: "login", payload: session.user });
      } else {
        dispatch({ type: "logout" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signup({ email, password, name }: {email: string, password: string, name: string}) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, avatar_url: "https://i.pravatar.cc/100" },
      },
    });
    if (error) throw new Error(error.message);
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  return (
    <AuthContext.Provider value={{ login, logout, signup, user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext};