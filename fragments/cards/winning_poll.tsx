import Image from "next/image";

// comps
import { Header } from "../Typography/header";

// styles
import styles from "./winning_poll.module.css";

type TWinningPollProps = {
   message: string;
   image: string;
};

export const WinningPoll = ({ message, image }: TWinningPollProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.image}>
            <Image src={image} alt='party icon' layout='fill' />
         </div>
         <div className={styles.message}>
            <Header text={message} size='small' type={3} align='center' />
         </div>
      </div>
   );
};
