import { link } from "fs";
import Link from "next/link";
import { Icon } from "../chunks/icons";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./settings_field_button.module.css";

type TSettingsFieldButtonprops = {
   label: string;
   value: string;
   link?: string;
   cta?: { handleClick: React.MouseEventHandler<HTMLDivElement> };
};
export const SettingsFieldButton = ({ label, value, cta, link }: TSettingsFieldButtonprops) => {
   return (
      <div className={styles.mainWrapper}>
         {link && (
            <Link href={link}>
               <a className={styles.button}>
                  <div className={styles.label}>
                     <Parragraph text={label} size='small' />
                  </div>
                  <div className={styles.value}>
                     <Parragraph text={value} size='small' />
                     <div className={styles.icon}>
                        <Icon name='arrowForth' color='#F1EAFF' size='2rem' strokeWidth='64' />
                     </div>
                  </div>
               </a>
            </Link>
         )}

         {cta && (
            <div className={styles.button} onClick={cta.handleClick}>
               <div className={styles.label}>
                  <Parragraph text={label} size='small' />
               </div>
               <div className={styles.value}>
                  <Parragraph text={value} size='small' />
                  <div className={styles.icon}>
                     <Icon name='arrowForth' color='#F1EAFF' size='2rem' strokeWidth='64' />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
