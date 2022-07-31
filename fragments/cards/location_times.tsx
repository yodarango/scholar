// comps
import { Icon } from "../chunks/icons";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./location_times.module.css";

type TLocationTimesProps = {
   serviceInfo: string;
};

export const LocationTimes = ({ serviceInfo }: TLocationTimesProps) => {
   const day: string = serviceInfo.split(" ")[0];
   const time: string = serviceInfo.split(" ")[1];
   const iconType: string = serviceInfo.includes("pm") ? "sunLow" : "sun";

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.day}>
            <Header size='main' type={3} text={day} lineHieght='1em' />
         </div>
         <div className={styles.time}>
            <Parragraph text={time} size='main' lineHieght='1em' />
         </div>
         <div className={styles.icon}>
            <Icon name={iconType} size='2rem' color='#F1EAFF' />
         </div>
      </div>
   );
};
