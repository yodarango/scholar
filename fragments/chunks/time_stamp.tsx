import { calcElapsedTime } from "../../helpers/Time/calc_time_elapsed";
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";
import styles from "./time_stamp.module.css";

type TimeStampProps = {
   time: string;
   niceTime: string;
   quiet: boolean;
   fontSize?: string;
};

export const TimeStamp = ({ time, fontSize, quiet, niceTime }: TimeStampProps) => {
   const formatedTime = calcElapsedTime(time);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.closed}>
            <Parragraph
               size={fontSize ? fontSize : "xxsmall"}
               bold={true}
               text={formatedTime ? `${formatedTime} ago` : "sometime ago"}
               quiet={quiet}
               lineHieght={"1em"}
            />
         </div>
         <div className={styles.open}>
            <Parragraph
               size={fontSize ? fontSize : "xxsmall"}
               bold={true}
               text={niceTime}
               quiet={quiet}
               lineHieght={"1em"}
            />
            <div className={styles.closeBtnWrapper}>
               <Icon name='remove' color='#F1EAFF' size='2rem' strokeWidth='42' />
            </div>
         </div>
      </div>
   );
};
