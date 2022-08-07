// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./bring_up_hidden_bottom.module.css";

type TBringUpHiddenBottomProps = {
   cta: {
      handleClick: () => void;
   };
};

export const BringUpHiddenBottom = ({ cta }: TBringUpHiddenBottomProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.topArrow} onClick={cta.handleClick}>
            <Icon name='arrowTopLong' color='#F1EAFF' size='2rem' />
         </div>
         <div className={styles.bottomBorder}></div>
      </div>
   );
};
