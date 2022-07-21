import { Parragraph } from "../Typography/parragraph";
import styles from "./menu_primary_option.module.css";

type TMenuPrimaryOptionProps = {
   iconType: string;
   textType: string;
   text: string;
   icon?: any;
   shadow: string;
   shadowColor?: string;
   cta: React.MouseEventHandler<HTMLDivElement>;
};
export const MenuPrimaryOption = ({
   iconType,
   textType,
   icon,
   text,
   shadow,
   shadowColor
}: TMenuPrimaryOptionProps) => {
   let shadowClr: string = "";

   switch (shadow) {
      case "light":
         shadowClr = "2px 2px 6px #F1EAFF";
         break;

      case "dark":
         shadowClr = "4px 4px 6px #1a1723";
         break;

      case "custom":
         shadowClr = `2px 2px 6px ${shadowColor}`;
         break;
   }

   return (
      <div className={`${styles.mainWrapper}`}>
         {iconType === "icon" && (
            <div className={`${styles.icon}`} style={{ boxShadow: shadowClr }}>
               <div className={styles.iconWrapper}>{icon}</div>
            </div>
         )}

         {iconType === "text" && (
            <div className={`${styles.icon}`} style={{ boxShadow: shadowClr }}>
               <Parragraph align='center' size='large' text={text} lineHieght='.9em' bold={true} />
            </div>
         )}

         {iconType === "filled" && (
            <div
               className={`${styles.icon}`}
               style={{ boxShadow: shadowClr, backgroundColor: shadowClr }}></div>
         )}
         <div className={styles.text}>
            <Parragraph size='main' text={text} />
         </div>
      </div>
   );
};
