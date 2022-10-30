/**********************************************************************************************************
-  Content holder that is rendered directly from a page or from a high level component.
**********************************************************************************************************/
// comps
import { CloseContent } from "../../../fragments/buttons/close_content";
import { CategoryTag } from "../../../fragments/chunks/category_tag";
import { Icon } from "../../../fragments/chunks/icons";
import { ToggleMenu } from "../../../fragments/chunks/toggle_menu";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./secondary_stack.module.css";

type TPrimaryStackprops = {
   title: string;
   children: (string | JSX.Element) | (string | JSX.Element)[];
   icon?: string;
   menuType?: number;
   cta?: {
      handleClose: () => void;
   };
};

export const SecondaryStack = ({ title, children, menuType, icon, cta }: TPrimaryStackprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gradientBkg}>
            <div className={styles.title}>
               <Header size='large' type={1} text={title} lineHieght='.9em' />
               {icon && (
                  <div className={styles.icon}>
                     <Icon size='2rem' name={icon} color='#F1EAFF' />
                  </div>
               )}
            </div>
         </div>
         <div className={styles.toggleIcon}>
            {menuType === 1 && <ToggleMenu type={1} />}
            {menuType === 2 && <CategoryTag informativeOnly={false} />}
            {cta?.handleClose && <CloseContent cta={{ handleClick: cta?.handleClose }} />}
         </div>
         <div className={styles.subWrapper}>
            <div className={styles.contentHolder}>{children}</div>
         </div>
      </div>
   );
};
