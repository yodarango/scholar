import { AddContent } from "../../fragments/buttons/add_content";
import { AboutMe } from "../../layouts/account/profile/about_me";
import { NavigateThruPosts } from "../../layouts/account/profile/navigate_thru_posts";
import { UserPostStats } from "../../layouts/account/profile/user_post_stats";
import { ProfileArt } from "../../layouts/stacks/headers/profile_art";
import styles from "./profile.module.css";

type TProfileProps = {
   username: string;
};
export const Profile = ({ username }: TProfileProps) => {
   return (
      <div className={styles.mainWrapper}>
         <ProfileArt title={username} />
         <div className={styles.stats}>
            <UserPostStats commentaries={45} thoughts={11} quotes={67} sermonNotes={27} />
         </div>
         <div className={styles.aboutMe}>
            <AboutMe
               userId='432'
               myChurch='My good Lord knows'
               ministry='worthless slave'
               favBibleVerse='1 Peter 1:8'
               fullTimeJob='Software Engneer'
               colorPersonality='green'
               favColor='Gray'
            />
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
