// comps
import { useState } from "react";
import { Icon } from "../chunks/icons";

// styles
import styles from "./bring_up_hidden_bottom.module.css";

type TBringUpHiddenBottomProps = {
   cta: {
      handleClick: () => void;
   };
};

export const BringUpHiddenBottom = ({ cta }: TBringUpHiddenBottomProps) => {
   const [arrowRotateClass, setarrowRotateClass] = useState<string>(
      styles.arrowUp
   ); /* changes class on the arrow to rotate */

   const [isArrowUp, setisArowUp] = useState<boolean>(true);

   // rotate the arrow to the bottom and call the cta
   const handleClick = () => {
      cta.handleClick();

      isArrowUp
         ? (setarrowRotateClass(styles.arrowDown), setisArowUp(false))
         : (setarrowRotateClass(styles.arrowUp), setisArowUp(true));
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={`${styles.topArrow}`} onClick={handleClick}>
            <div className={`${arrowRotateClass}`}>
               <Icon name='arrowTopLong' color='#F1EAFF' size='2rem' />
            </div>
         </div>
         <div className={styles.bottomBorder}></div>
      </div>
   );
};
