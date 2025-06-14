import styles from "./Message.module.css";

function Message({ message }: { message: string}) {
  return (
    <p className={styles.message}>
      <span role="img">👋{message}</span> 
    </p>
  );
}

export default Message;
