import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Parragraph } from "../Typography/parragraph";
import style from "./folder_card.module.css";
import { Icon } from "../chunks/icons";
import { FONT_COLOR } from "../../../constants/tokens";
import Portal from "../../hoc/potal";
import { SelectFolderOptions } from "../../layouts/menus/select_folder_options";
import { useDeleteContent } from "../../../helpers/functions/posts/content_delete";
import { Notification } from "../popups/notification";
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";
import { CONTENT_TYPE_FOLDER } from "../../../constants/defaults";
import { useRouter } from "next/router";

type FolderCardProps = {
   className?: string;
   thumbnail: string;
   folderName: string;
   postCount: number | string;
   isPrivate: boolean;
   showEdit?: boolean;
   userSignature?: string;
   cta?: {
      handleClick?: (id: string | number) => void;
   };
   ID: string | number;
};
export const FolderCard = ({
   className,
   thumbnail,
   folderName,
   postCount,
   isPrivate,
   userSignature = "@me",
   showEdit = true,
   cta,
   ID
}: FolderCardProps) => {
   const router = useRouter();
   const [showModal, setShowModal] = useState<boolean>(false);
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState<{
      type: string;
      title: string;
      body: string;
   } | null>(null);

   const { handleDelete, data } = useDeleteContent();

   const isFirstLoad = useRef(1);
   useEffect(() => {
      if (isFirstLoad.current >= 2) {
         if (data && data.ID) {
            setisDeleted(true);
            setNotification({
               type: "2",
               title: notificationMessages.folderDeleted.title,
               body: notificationMessages.folderDeleted.body
            });
         }
         // else {
         //    setNotification({
         //       type: "4",
         //       title: errorMessages.posts.failedToDeleteFolder.title,
         //       body: errorMessages.posts.failedToDeleteFolder.body
         //    });
         // }
      }
      return () => {
         isFirstLoad.current = isFirstLoad.current + 1;
      };
   }, [data]);

   return (
      <>
         <Portal>
            {notification && (
               <Notification
                  cta={{ handleClose: () => setNotification(null) }}
                  type={notification.type}
                  title={notification.title}
                  body={notification.body}
               />
            )}

            {showModal && (
               <SelectFolderOptions
                  cta={{
                     handleCloseModal: () => setShowModal(!showModal),
                     handleDelete: (id) => {
                        setShowModal(false);
                        handleDelete(id, CONTENT_TYPE_FOLDER);
                     },
                     handleEdit: () => router.push(`/users/${userSignature}folders/edit/${ID}`)
                  }}
                  folderId={ID}
               />
            )}
         </Portal>

         {!isDeleted && (
            <div className={style.mainWrapper}>
               <div className={`shadow-s ${style.cardWrapper} ${className}`}>
                  <div
                     className={style.imageWrapper}
                     onClick={() => {
                        if (cta?.handleClick) cta.handleClick(ID);
                        else router.push(`/users/${userSignature}/folders/${ID}`);
                     }}>
                     {thumbnail && (
                        <Image
                           src={thumbnail}
                           alt='thumbnail for a book of the bible'
                           layout='fill'
                           defaultValue={""}
                        />
                     )}
                  </div>
                  <div
                     className={style.folderName}
                     onClick={() => {
                        if (cta?.handleClick) cta.handleClick(ID);
                        else router.push(`/users/${userSignature}/folders/${ID}`);
                     }}>
                     <Parragraph text={folderName} size='main' />
                  </div>

                  <div className={style.postCount}>
                     <div className={style.countInt}>
                        <Parragraph text={postCount} bold size='main' />
                     </div>
                  </div>
               </div>
               <div className={`${style.iconsWrapper}`}>
                  {isPrivate && (
                     <div
                        title='This folder is private. Only you can see it.'
                        className={`${style.icon}  ${style.lockIcon}`}
                        onClick={() => setShowModal(!showModal)}>
                        <Icon name='lockClosed' color={FONT_COLOR} size='15px' />
                     </div>
                  )}
                  {showEdit && (
                     <div className={`${style.icon}`} onClick={() => setShowModal(!showModal)}>
                        <Icon name='ellipsisH' color={FONT_COLOR} />
                     </div>
                  )}
               </div>
            </div>
         )}
      </>
   );
};
