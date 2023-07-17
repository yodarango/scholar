// TODO: Add an optional Icon before the label
import Link from "next/link";
import { Icon } from "../chunks/icons";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./settings_field_button.module.css";
import { FONT_COLOR } from "../../../constants/tokens";

type TSettingsFieldButtonprops = {
   label: string;
   value?: string;
   link?: string;
   className?: string;
   cta?: { handleClick: React.MouseEventHandler<HTMLDivElement> | (() => void) };
};

export const SettingsFieldButton = ({
   label,
   value,
   cta,
   link,
   className = ""
}: TSettingsFieldButtonprops) => {
   return (
      <div className={`${styles.mainWrapper} ${className}`}>
         {link && (
            <Link href={link}>
               <a className={styles.button}>
                  <div className={styles.label}>
                     <Parragraph text={label} size='main' />
                  </div>
                  <div className={styles.value}>
                     {value && <Parragraph text={value} size='small' />}
                     <div className={styles.icon}>
                        <Icon name='arrowForth' color={FONT_COLOR} size='3rem' strokeWidth='64' />
                     </div>
                  </div>
               </a>
            </Link>
         )}

         {cta && (
            <div className={styles.button} onClick={cta.handleClick}>
               <div className={styles.label}>
                  <Parragraph text={label} size='main' />
               </div>
               <div className={styles.value}>
                  {value && <Parragraph text={value} size='small' />}
                  <div className={styles.icon}>
                     <Icon name='arrowForth' color={FONT_COLOR} size='3rem' strokeWidth='64' />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
