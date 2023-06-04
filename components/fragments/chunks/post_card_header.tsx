/************************************************************************************************** 
-  A small component used on the header of the post card.
-  Not very flexible or customizable. However user can decide whether to show the category tag or
   not by passign the withCategoryTag prop
***************************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { Icon } from "./icons";
import Portal from "../../hoc/potal";
import { UserAvatarWUsername } from "./user_avatar_w_username";
import { CategoryTag } from "./category_tag";
import { SelectpostOptions } from "../../layouts/menus/select_post_options";
import { TimeStamp, TimeStampProps } from "./time_stamp";

// styles
import styles from "./post_card_header.module.css";

// type
import { EnumContentType } from "../../../types/enums";
import { FONT_COLOR } from "../../../constants/tokens";
import { FolderList } from "../../layouts/stacks/folders_list";
import { useSaveToFolders } from "../../../helpers/functions/folders/use_save_to_folder";
import { Notification } from "../popups/notification";

export type TCommentaryCardHeaderProps = {
   username: string;
   avatar: string;
   userId: string;
   postId: string;
   userAuthority: number;
   withCategoryTag?: string;
   folderName?: string;
   folderId?: string;
   postType: string;
   contentType: EnumContentType;
   fontColor?: string;
   widthTimeStamp?: TimeStampProps;
   postSettingsOptions?: {
      showShareopton?: boolean;
      showEditOption?: boolean;
      showDeleteOption?: boolean;
      showReportOption?: boolean;
      showSavetoFolderOption: boolean;
   };
   cta: {
      handleDelete: (id: string) => void;
   };
};

const COMMENTARY_FOLDERS = 1;

export const PostCardHeader = ({
   username,
   avatar,
   userId,
   postId,
   userAuthority,
   withCategoryTag,
   folderId,
   folderName,
   postType,
   contentType,
   fontColor,
   widthTimeStamp,
   postSettingsOptions,
   cta
}: TCommentaryCardHeaderProps) => {
   // state
   const [showPostOptions, setshowPostOptions] = useState<boolean>(false);
   const { status, data, save } = useSaveToFolders();
   const [showModal, setshowModal] = useState<number>(0);
   const [notification, setnotification] = useState<{
      type: string;
      title: string;
      body: string;
   } | null>(null);

   // handle action: pass ID to parent and hide menu
   const handleDelete = (id: string) => {
      setshowPostOptions(false);
      cta.handleDelete(id);
   };

   const handleSaveToFolder = (id: string | number) => {
      setshowModal(0);
      save({ folder_id: id, post_id: postId });
   };

   useEffect(() => {
      if (status)
         setnotification({
            type: status.type || "",
            title: status.title || "",
            body: status.body || ""
         });
   }, [status, data]);

   return (
      <>
         {showModal === COMMENTARY_FOLDERS && (
            <FolderList
               cta={{
                  handleFolderSelection: handleSaveToFolder
               }}
            />
         )}

         <div className={styles.mainWrapper}>
            <Portal>
               {notification && (
                  <Notification
                     type={notification.type}
                     title={notification.title}
                     body={notification.body}
                     cta={{
                        handleClose: () => setnotification(null)
                     }}
                  />
               )}
               {showPostOptions && (
                  <SelectpostOptions
                     postid={postId}
                     postType={postType}
                     userId={userId}
                     contentType={contentType}
                     folderName={folderName}
                     folderId={folderId}
                     showShareopton={postSettingsOptions?.showShareopton}
                     showEditOption={postSettingsOptions?.showEditOption}
                     showDeleteOption={postSettingsOptions?.showDeleteOption}
                     showReportOption={postSettingsOptions?.showReportOption}
                     showSavetoFolderOption={postSettingsOptions?.showSavetoFolderOption}
                     cta={{
                        handleSaveToFolder: () => {
                           setshowModal(COMMENTARY_FOLDERS);
                           setshowPostOptions(false);
                        },
                        handleCloseModal: () => setshowPostOptions(false),
                        handleReport: () => setshowPostOptions(false),
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

            <div className={styles.icon} onClick={() => setshowPostOptions(!showPostOptions)}>
               <Icon name='ellipsisH' size='2rem' color={fontColor ? fontColor : FONT_COLOR} />
            </div>

            {/*  include / exclude category tag   */}
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
      </>
   );
};
