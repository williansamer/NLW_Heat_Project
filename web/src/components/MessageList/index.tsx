import io from 'socket.io-client';
import {api} from '../../services/api';

import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from 'react';

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messageQueue: Message[] = []; // this is a queue of messages that will be sent to the server

const socket = io("http://localhost:4000"); // connect to the server

socket.on("new_message", (newMessage: Message) => { // listen for new messages
  messageQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(()=>{
      if(messageQueue.length > 0){
        setMessages(prevState=>[
          messageQueue[0], // add the first message in the queue and will become the first message in the list
          prevState[0], // add the first message in the message and will become the second message in the list
          prevState[1], // add the second message in the message and will become the third message in the list
        ].filter(Boolean))
        messageQueue.shift(); // remove the first message from the queue
      }
    }, 1000);
  }, []);

  useEffect(()=>{
    api.get<Message[]>('/messages/last3').then(response=>setMessages(response.data));
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="" />

      <ul className={styles.messageList}>

      {messages.map((message)=>{
        return (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContet}>
              {message.text}
            </p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        )
      })}

      </ul>
    </div>
  )
}