// TODO: This clock might not be working as expected if a data over 24 hours is passed
// This component needs a static time to count down to. Right now the value is saved in the DB
import { useEffect, useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./card_timer.module.css";

type TCardProps = {
   time: string;
};

export const CardTimer = ({ time }: TCardProps) => {
   // --------------------- set the timer ---------------------

   // -- get the original date to count to
   const [originalDate] = useState<string>(time);

   const [timer, settimer] = useState<string>("");

   // --  updates the time left when called every second
   const updateTimer = setInterval(setTimer, 1000);
   function setTimer() {
      const currDate = new Date().getTime();
      let timeLeft = new Date(originalDate).getTime() - currDate;
      let h = Math.floor((timeLeft % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
      let m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (timeLeft < 0) {
         clearInterval(updateTimer);
         settimer("00:00:00");
      } else if (timeLeft > 0) {
         settimer(`${h}:${m}:${s}`);
      }
   }

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.timerWrapper}>
            <Parragraph text={timer} size='xsmall' align='center' bold={true} />
         </div>
      </div>
   );
};

export default CardTimer;
