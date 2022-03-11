
import { useContext } from "react";
import styles from "./App.module.scss";
import { AuthContext } from "./components/contexts/auth";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";

export function App() {
  const {user} = useContext(AuthContext);

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox /> } {/* '!!user'(se NÃO for null) */}
    </main>
  )
}
