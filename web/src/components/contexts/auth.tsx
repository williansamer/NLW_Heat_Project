import {useEffect, useState} from "react";
import { createContext } from "react";
import {api} from "../../services/api";

type AuthProviderType = {
  children: React.ReactNode;
}

type User = {
  id: string;
  login: string;
  avatar_url: string;
  name: string;
}

type AuthContextData = { //Ligação das propriedades com o value do AuthContext.Provider
  user: User | null;
  signInUrl: string;
  signOut: ()=>void; //signOut é uma função que retorna void(não tem retorno)
}

type AuthType = {
  token: string;
  user: {
    id : string;
    login: string;
    avatar_url: string;
    name: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=0e54352158a7196179b5`;

  function signOut(){
    setUser(null);
    localStorage.removeItem("@github:token");
  }

  async function signIn(code: string){
    const response = await api.post<AuthType>("authenticate", {code}); /* code no corpo da api. Poderia estar como params se no backend estivesse */

    const {token, user } = response.data;

    localStorage.setItem("@github:token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }

  useEffect(()=>{
    const url = window.location.href;
    const hasGitHubCode = url.includes("?code=");

    if(hasGitHubCode){
      const [urlWithoutCode, code] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode); /* pushState força alterar a url */

      signIn(code);
    }
  }, [])

  useEffect(()=>{
    const token = localStorage.getItem("@github:token");

    if(token){
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then(response => setUser(response.data));
    }
  }, [])

  return(
    <AuthContext.Provider value={{user, signInUrl, signOut}}>
      {props.children}
    </AuthContext.Provider>
  )
}