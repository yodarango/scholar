/*************************************************************************************************
-  A useful header that contains user's and a posts's or text's metadata (username, category, etc)
-  If a cta.handleClickOnAvatar is passed the user wont be redirected to the users profile.
**************************************************************************************************/

// comps
import { CategoryTag } from "./category_tag";
import { TimeStamp } from "./time_stamp";
import { UserAvatarWUsername } from "./user_avatar_w_username";

// styles
import styles from "./see_post_info.module.css";

type TSeePostInfoProps = {
   avatarSize?: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   customDateColor?: string;
   customDateFontColor?: string;
   shadowDateColor?: string;
   cta?: {
      handleClickOnAvatar?: (userId: string) => void;
   };
};

export const SeePostInfo = ({
   avatarSize = "3.5rem",
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   customDateFontColor,
   customDateColor,
   shadowDateColor,
   cta
}: TSeePostInfoProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            {/* user wont be redirected to users profile when click. a callback will be initiated instead */}
            {cta?.handleClickOnAvatar && (
               <UserAvatarWUsername
                  cta={{
                     handleClick: () => cta.handleClickOnAvatar && cta.handleClickOnAvatar(userId)
                  }}
                  avatarSize={avatarSize}
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
            {!cta?.handleClickOnAvatar && (
               <UserAvatarWUsername
                  avatarSize={avatarSize}
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
         {postCreatedDate && postPostedOnDate && (
            <div className={styles.timeStamp}>
               <TimeStamp
                  customColor={customDateColor}
                  shadowColor={shadowDateColor}
                  time={postCreatedDate}
                  niceTime={postPostedOnDate}
                  customFontColor={customDateFontColor}
                  quiet={false}
               />
            </div>
         )}
         {postCategory && (
            <div className={styles.tag}>
               <CategoryTag id={postCategory} informativeOnly={true} />
            </div>
         )}
      </div>
   );
};
