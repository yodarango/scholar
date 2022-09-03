/**********************************************************************************************************
-  Content holder that is rendered directly from a page or from a high level component.
-  Allows fro customizable background. 
-  Used mainly for the user profile page.
**********************************************************************************************************/

// comps
import { Icon } from "../../../fragments/chunks/icons";
import { ToggleMenu } from "../../../fragments/chunks/toggle_menu";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./teritary_stack.module.css";

type TTeritaryStackprops = {
   children: (string | JSX.Element) | (string | JSX.Element)[];
   title: string;
   icon?: string;
   hasNotifications?: boolean;
};

export const TeritaryStack = ({
   title,
   icon,
   children,
   hasNotifications = false
}: TTeritaryStackprops) => {
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
            <span className={styles.notificationBadge}></span>
            <ToggleMenu type={2} profileMenuOptions={{ userHasNotifications: hasNotifications }} />
         </div>
         <div className={styles.subWrapper}>
            <div className={styles.contentHolder}>{children}</div>
         </div>
      </div>
   );
};
