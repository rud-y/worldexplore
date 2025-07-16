import { createContext, useContext, useReducer } from "react";

type AuthContextType = {
  user: string;
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string, password: string}) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const initialState = {
 user: null,
 isAuthenticated: false,
}

function reducer(state, action) {
 switch(action.type) {
  case "login":
   return {
    ...state, user: action.payload, isAuthenticated: true
   };

  case "logout":
   return {
    ...state, user: null, isAuthenticated: initialState.isAuthenticated
   };

  default:
   throw new Error('Unknown action')
 }
}

const FAKE_USER = {
 name: "Zeee",
 email: "jack@example.com",
 password: "qwerty",
 avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({children}) {

 const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

 function login(email, password) {
  if(email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: "login", payload: FAKE_USER })
 }

 function logout() {
  dispatch({ type: "logout"})
 }

 return <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>{children}</AuthContext.Provider>
}

function useAuth() {
 const context = useContext(AuthContext)

 if(context === undefined) throw new Error('AuthContext was used outside of AuthProvider')

  return context;
}

export { AuthProvider, useAuth }