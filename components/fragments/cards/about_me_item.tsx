import { Parragraph } from "../Typography/parragraph";
import styles from "./about_me_item.module.css";

type TAboutMeItemProps = {
   emoji: string;
   value: string;
};

export const AboutMeItem = ({ emoji, value }: TAboutMeItemProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.emoji}>
            <Parragraph text={emoji} size='xxxlarge' lineHieght='1em' />
         </div>
         <div className={styles.value}>
            <Parragraph text={value} size='small' lineHieght='1em' />
         </div>
      </div>
   );
};
