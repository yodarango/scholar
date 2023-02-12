// TODO: This clock might not be working as expected if a data over 24 hours is passed
// This component needs a static time to count down to. Right now the value is saved in the DB
import { useEffect, useState } from "react";
import { countDown } from "../../../helpers/Time/countdown";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./card_timer.module.css";

type TCardProps = {
   time: string;
   cta: { timesUp: () => void };
};

export const CardTimer = ({ time, cta }: TCardProps) => {
   // --------------------- set the timer ---------------------

   // -- get the original date to count to
   const [originalDate] = useState<string>(time);

   const [timer, settimer] = useState<string>("");

   // --  updates the time left when called every second
   const updateTimer = setInterval(setTimer, 1000);
   function setTimer() {
      const timer = countDown(originalDate);
      settimer(timer.time);

      if (timer.done) {
         clearInterval(updateTimer), cta.timesUp();
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
