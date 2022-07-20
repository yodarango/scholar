import { useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";

// styles
import styles from "./time_stamp.module.css";

// helpers
import { calcElapsedTime } from "../../helpers/Time/calc_time_elapsed";

type TimeStampProps = {
   time: string;
   niceTime: string;
   quiet: boolean;
   fontSize?: string;
};

export const TimeStamp = ({ time, fontSize, quiet, niceTime }: TimeStampProps) => {
   const formatedTime = calcElapsedTime(time);

   const [isOpenTimeStamp, setisOpenTimeStamp] = useState<boolean>(false);

   return (
      <div className={styles.mainWrapper}>
         {!isOpenTimeStamp && (
            <div className={styles.closed} onClick={() => setisOpenTimeStamp(true)}>
               <Parragraph
                  size={fontSize ? fontSize : "xxsmall"}
                  bold={true}
                  text={formatedTime ? `${formatedTime} ago` : "sometime ago"}
                  quiet={quiet}
                  lineHieght={"1em"}
               />
            </div>
         )}

         {/* --------- opne time stamp. Might add some nice css animations like stretch in the future ---------- */}
         {isOpenTimeStamp && (
            <div className={styles.open}>
               <Parragraph
                  size={fontSize ? fontSize : "xxsmall"}
                  bold={true}
                  text={niceTime}
                  quiet={quiet}
                  lineHieght={"1em"}
               />
               <div className={styles.closeBtnWrapper} onClick={() => setisOpenTimeStamp(false)}>
                  <Icon name='remove' color='#F1EAFF' size='2rem' strokeWidth='42' />
               </div>
            </div>
         )}
      </div>
   );
};
