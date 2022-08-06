import { CategoryTag } from "./category_tag";
import styles from "./see_post_info.module.css";
import { TimeStamp } from "./time_stamp";
import { UserAvatarWUsername } from "./user_avatar_w_username";

type TSeePostInfoProps = {
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
};

export const SeePostInfo = ({
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory
}: TSeePostInfoProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            <UserAvatarWUsername
               avatarSize='3.5rem'
               userAuthority={userAuthority}
               avatarSrc={avatar}
               userId={userId}
               username={username}
               flowV={false}
               fontSize='xsmall'
               quiet={false}
               align='left'
            />
         </div>
         <div className={styles.timeStamp}>
            <TimeStamp time={postCreatedDate} niceTime={postPostedOnDate} quiet={false} />
         </div>
         <div className={styles.tag}>
            <CategoryTag id={postCategory} informativeOnly={true} />
         </div>
      </div>
   );
};
