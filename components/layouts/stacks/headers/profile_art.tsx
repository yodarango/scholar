/**********************************************************************************************************
-  Content holder that is rendered directly from a page or from a high level component.
-  Allows fro customizable background. 
-  Used mainly for the user profile page.
-  if the userID is not passed the data for the user currently logged in 
**********************************************************************************************************/
import { useEffect, useState } from "react";

// comps
//import { Header } from "../../../fragments/Typography/header";
import { ToggleMenu } from "../../../fragments/chunks/toggle_menu";
import { UserStats } from "../../account/profile/user_stats";

// comps
import {
   getProfileGetArt,
   TgetProfileArt
} from "../../../../helpers/functions/users/profile_get_art";

// data/ types
import { TuserSummary } from "../../../../types/user";

// styles
import styles from "./profile_art.module.css";

type TTeritaryStackprops = {
   userID?: string;
   title: string;
   icon?: string;
   hasNotifications?: boolean;
};

export const ProfileArt = ({
   title,
   icon,
   hasNotifications = false,
   userID
}: TTeritaryStackprops) => {
   const [loading, setloading] = useState("loading");
   const [data, setdata] = useState<TuserSummary>({
      ID: "0",
      signature: "",
      avatar: "default.png",
      authority_level: 1,
      total_ratings: 0,
      approval_rating: 101,
      total_posts: 0,
      has_new_notifications: false
   });
   const getData = async (variables: TgetProfileArt) => {
      try {
         const { data, status } = await getProfileGetArt(variables);
         setloading(status);
         setdata(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (userID) {
         getData({ ID: userID });
      } else {
         getData({ isSelf: true });
      }
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gradientBkg}>
            <div className={styles.stats}>
               <UserStats user_summary={data} />
            </div>
         </div>
         <div className={styles.toggleIcon}>
            {hasNotifications && <span className={styles.notificationBadge}></span>}
            <ToggleMenu
               type={2}
               profileMenuOptions={{ userHasNotifications: data.has_new_notifications }}
            />
         </div>
         <div className={styles.subWrapper}></div>
      </div>
   );
};
