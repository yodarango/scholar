/**********************************************************************************************************
-  Content holder that is rendered directly from a page or from a high level component.
-  Allows fro customizable background. 
-  Used mainly for the user profile page.
**********************************************************************************************************/

// comps
import { Icon } from "../../../fragments/chunks/icons";
import { ToggleMenu } from "../../../fragments/chunks/toggle_menu";
import { Header } from "../../../fragments/Typography/header";
import { UserStats } from "../../account/profile/user_stats";

// styles
import styles from "./profile_art.module.css";

type TTeritaryStackprops = {
   title: string;
   icon?: string;
   hasNotifications?: boolean;
};

export const ProfileArt = ({ title, icon, hasNotifications = false }: TTeritaryStackprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gradientBkg}>
            <div className={styles.stats}>
               <UserStats
                  username='username'
                  avatar='/images/user_avatars/default.png'
                  userAuthority={1}
                  ratingCount={0}
                  rating={96}
                  postCount={38}
               />
            </div>
         </div>
         <div className={styles.toggleIcon}>
            {hasNotifications && <span className={styles.notificationBadge}></span>}
            <ToggleMenu type={2} profileMenuOptions={{ userHasNotifications: hasNotifications }} />
         </div>
         <div className={styles.subWrapper}></div>
      </div>
   );
};
