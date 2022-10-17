// comps
import { Parragraph } from "../Typography/parragraph";
import { IconButton } from "./icon_button";

// styles
import styles from "./icon_with_text.module.css";

type TIconWithTextProps = {
   title: string;
   buttonColor: string;
   link?: string;
   icon: string;
   cta?: {
      handleClick: React.MouseEventHandler<HTMLButtonElement>;
   };
};

export const IconWithText = ({ title, buttonColor, icon, cta, link }: TIconWithTextProps) => {
   return (
      <div className={styles.mainWrapper}>
         {cta && (
            <div className={styles.icon}>
               <IconButton backgroundColor={buttonColor} icon={icon} cta={cta.handleClick} />
            </div>
         )}
         {link && (
            <div className={styles.icon}>
               <IconButton backgroundColor={buttonColor} icon={icon} link={link} />
            </div>
         )}

         <div className={styles.text}>
            <Parragraph size='main' text={title} />
         </div>
      </div>
   );
};
