
import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc"
import { AuthContext } from "../contexts/auth";
import styles from "./styles.module.scss";

export function LoginBox() {

  const {user, signInUrl} = useContext(AuthContext);

  console.log(user)
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong> 
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24" /> {/* Com isso, ele se torna um svg */}
        Entrar com GitHub
      </a>
    </div>
  )
}