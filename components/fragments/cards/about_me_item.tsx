import { Parragraph } from "../Typography/parragraph";
import styles from "./about_me_item.module.css";

type TAboutMeItemProps = {
   emoji: string;
   value: string;
   initialValue: string;
};

export const AboutMeItem = ({ emoji, value, initialValue }: TAboutMeItemProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.emoji}>
            <Parragraph text={emoji} size='xxxlarge' lineHieght='1em' />
         </div>
         <div className={styles.value}>
            <Parragraph text={value ? value : initialValue} size='main' lineHieght='1.5em' />
         </div>
      </div>
   );
};
