/************************************************************************************************** 
-  A small component used on the header of the post card.
-  Not very flexible or customizable. However user can decide whether to show the category tag or
   not by passign the withCategoryTag prop
***************************************************************************************************/

import { useState } from "react";

// comps
import { Icon } from "./icons";
import Portal from "../../hoc/potal";
import { UserAvatarWUsername } from "./user_avatar_w_username";
import { CategoryTag } from "./category_tag";
import { SelectpostOptions } from "../../layouts/menus/select_post_options";
import { TimeStamp, TimeStampProps } from "./time_stamp";

// styles
import styles from "./post_card_header.module.css";
import { time, timeStamp } from "console";

export type TCommentaryCardHeaderProps = {
   username: string;
   avatar: string;
   userId: string;
   postId: string;
   userAuthority: number;
   withCategoryTag?: string;
   postType: string;
   fontColor?: string;
   widthTimeStamp?: TimeStampProps;
   postSettingsOptions?: {
      showShareopton?: boolean;
      showEditOption?: boolean;
      showDeleteOption?: boolean;
      showReportOption?: boolean;
   };
   cta: {
      handleDelete: (id: string) => void;
   };
};
export const PostCardHeader = ({
   username,
   avatar,
   userId,
   postId,
   userAuthority,
   withCategoryTag,
   postType,
   fontColor,
   widthTimeStamp,
   postSettingsOptions,
   cta
}: TCommentaryCardHeaderProps) => {
   // state
   const [showPostOptions, setshowPostOptions] = useState<boolean>(false);

   // handle delete: pass ID to parent and hidem menu
   const handleDelete = (id: string) => {
      setshowPostOptions(false);
      cta.handleDelete(id);
   };

   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {showPostOptions && (
               <SelectpostOptions
                  postid={postId}
                  postType={postType}
                  showShareopton={postSettingsOptions?.showShareopton}
                  showEditOption={postSettingsOptions?.showEditOption}
                  showDeleteOption={postSettingsOptions?.showDeleteOption}
                  showReportOption={postSettingsOptions?.showReportOption}
                  cta={{
                     handleCloseModal: () => setshowPostOptions(false),
                     handleDelete
                  }}
               />
            )}
         </Portal>
         <div className={styles.user}>
            {fontColor && (
               <UserAvatarWUsername
                  username={username}
                  userId={userId}
                  avatarSrc={avatar}
                  quiet={false}
                  userAuthority={userAuthority}
                  avatarSize='2rem'
                  fontColor={fontColor}
               />
            )}
            {!fontColor && (
               <UserAvatarWUsername
                  username={username}
                  userId={userId}
                  avatarSrc={avatar}
                  quiet={false}
                  userAuthority={userAuthority}
                  avatarSize='2rem'
               />
            )}
         </div>

         <div className={styles.icon} onClick={() => setshowPostOptions(true)}>
            <Icon name='ellipsisH' size='2rem' color={fontColor ? fontColor : "#F1EAFF"} />
         </div>

         {/* ------------------ include / exlude category tag ------------  */}
         {withCategoryTag && (
            <div className={styles.category}>
               <CategoryTag
                  id={withCategoryTag}
                  informativeOnly={true}
                  customSize={true}
                  customBorderRadius='.5em'
               />
            </div>
         )}
         {widthTimeStamp && (
            <div className={styles.timeStamp}>
               <TimeStamp
                  time={widthTimeStamp.time}
                  niceTime={widthTimeStamp.niceTime}
                  quiet={widthTimeStamp.quiet}
               />
            </div>
         )}
      </div>
   );
};
