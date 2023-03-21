import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddContent } from "../../fragments/buttons/add_content";
import { AboutMe } from "../../layouts/account/profile/about_me";
import { NavigateThruPosts } from "../../layouts/account/profile/navigate_thru_posts";
import { UserPostStats } from "../../layouts/account/profile/user_post_stats";
import { ProfileArt } from "../../layouts/stacks/headers/profile_art";

// styles
import styles from "./profile.module.css";

type TProfileProps = {
   username: string;
};
export const Profile = ({ username }: TProfileProps) => {
   const [userId, setUserId] = useState<string | undefined>(undefined);
   const router = useRouter();

   useEffect(() => {
      if (typeof router?.query?.signature === "string") setUserId(router?.query?.signature);
   }, [router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         {userId && (
            <>
               <ProfileArt title={username} userID={userId} />
               <div className={styles.stats}>
                  <UserPostStats userID={userId} />
               </div>
               <div className={styles.aboutMe}>
                  <AboutMe userID={userId} />
               </div>
               <div className={styles.posts}>
                  <NavigateThruPosts />
               </div>
               <div className={styles.addContent}>
                  <AddContent />
               </div>
            </>
         )}
      </div>
   );
};
