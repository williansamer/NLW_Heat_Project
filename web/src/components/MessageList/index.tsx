import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="" />

      <ul className={styles.messageList}>

        <li className={styles.message}>
          <p className={styles.messageContet}>
            Um grande solucionador de problemas e com grande potencial de crescimento graças a minha força de vontade. Este sou eu. Só preciso de uma oportunidade para mostrar tudo o que tenho a oferecer.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://www.github.com/williansamer.png" alt="Willian Samer" />
            </div>
            <span>Willian Samer</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContet}>
            Um grande solucionador de problemas e com grande potencial de crescimento graças a minha força de vontade. Este sou eu. Só preciso de uma oportunidade para mostrar tudo o que tenho a oferecer.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://www.github.com/williansamer.png" alt="Willian Samer" />
            </div>
            <span>Willian Samer</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContet}>
            Um grande solucionador de problemas e com grande potencial de crescimento graças a minha força de vontade. Este sou eu. Só preciso de uma oportunidade para mostrar tudo o que tenho a oferecer.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://www.github.com/williansamer.png" alt="Willian Samer" />
            </div>
            <span>Willian Samer</span>
          </div>
        </li>

      </ul>
    </div>
  )
}