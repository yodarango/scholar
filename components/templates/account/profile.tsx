import { AddContent } from "../../fragments/buttons/add_content";
import { AboutMe } from "../../layouts/account/profile/about_me";
import { NavigateThruPosts } from "../../layouts/account/profile/navigate_thru_posts";
import { UserPostStats } from "../../layouts/account/profile/user_post_stats";
import { ProfileArt } from "../../layouts/stacks/headers/profile_art";

// styles
import styles from "./profile.module.css";

type TProfileProps = {
   userID?: string;
   username: string;
};
export const Profile = ({ username, userID }: TProfileProps) => {
   return (
      <div className={styles.mainWrapper}>
         <ProfileArt title={username} userID={userID} />
         <div className={styles.stats}>
            <UserPostStats userID={userID} />
         </div>
         <div className={styles.aboutMe}>
            <AboutMe userID={userID} />
         </div>
         <div className={styles.posts}>
            <NavigateThruPosts />
         </div>
         <div className={styles.addContent}>
            <AddContent />
         </div>
      </div>
   );
};
