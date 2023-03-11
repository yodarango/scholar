/****************************************************************************************
 * A <ul></ul> helper that builds a list from the items passed to it
 *******************************************************************/

import { Icon } from "../chunks/icons";
import { Parragraph } from "../Typography/parragraph";

//styles
import styles from "./ul_list_primary.module.css";

type TUlListPrimaryProps = {
   items: string[];
   icon?: string[] | string;
   iconColor?: string[] | string;
   textSize?: string;
   decorated?: boolean;
};

export const UlListPrimary = ({
   items,
   icon,
   iconColor = "#F1EAFF",
   textSize = "main",
   decorated
}: TUlListPrimaryProps) => {
   const isSingleIcon = typeof icon === "string";
   const isSingleColor = typeof iconColor === "string";

   return (
      <div className={styles.secList}>
         <ul className={`${decorated && styles.decorated} ${!icon && styles.noIcon}`}>
            {items.map((item: string, i: number) => (
               <li key={i}>
                  <div>
                     {icon && !decorated && (
                        <span className={styles.listIcon}>
                           <Icon
                              name={isSingleIcon ? icon : icon[i]}
                              color={isSingleColor ? iconColor : iconColor[i]}
                           />
                        </span>
                     )}
                     <Parragraph text={item} size={textSize} lineHieght='.9em' />
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};
