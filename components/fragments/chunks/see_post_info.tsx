/*****************************************************************************************
 - returns the component that renders on the posts/<type>/:id page or in the 
   preview_post_commentary_stack (might include others nin the future). takes in the info 
   about the user as props and a cta obj that tells the component how to handle the click
   on the users avatar. 
-  If a cta.handleClickOnAvatar is passed the user wont be redirected to the users profile.
******************************************************************************************/

// comps
import { CategoryTag } from "./category_tag";
import { TimeStamp } from "./time_stamp";
import { UserAvatarWUsername } from "./user_avatar_w_username";

// styles
import styles from "./see_post_info.module.css";

type TSeePostInfoProps = {
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   cta?: {
      handleClickOnAvatar: (userId: string) => void;
   };
};

export const SeePostInfo = ({
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   cta
}: TSeePostInfoProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            {/* user wont be redirected to users profile when click. a callback will be intiated instead */}
            {cta && (
               <UserAvatarWUsername
                  cta={{ handleClick: () => cta.handleClickOnAvatar(userId) }}
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
            )}
            {/* onClick user will be redirected to users profile */}
            {!cta && (
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
            )}
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
