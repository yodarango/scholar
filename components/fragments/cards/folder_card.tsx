import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Parragraph } from "../Typography/parragraph";
import style from "./folder_card.module.css";
import { Icon } from "../chunks/icons";
import { FONT_COLOR } from "../../../constants/tokens";
import Portal from "../../hoc/potal";
import { SelectFolderOptions } from "../../layouts/menus/select_folder_options";
import { useDeleteContent } from "../../../helpers/functions/posts/content_delete";
import { Notification } from "../popups/notification";
import { errorMessages } from "../../../data/error_messages";
import { CONTENT_TYPE_FOLDER } from "../../../constants/defaults";
import { useRouter } from "next/router";

type FolderCardProps = {
   className?: string;
   thumbnail: string;
   folderName: string;
   postCount: number | string;
   ID: string | number;
};
export const FolderCard = ({
   className,
   thumbnail,
   folderName,
   postCount,
   ID
}: FolderCardProps) => {
   const router = useRouter();
   const [showModal, setShowModal] = useState<boolean>(false);
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);

   const { handleDelete, data } = useDeleteContent();

   useEffect(() => {
      if (data && data.ID) {
         setisDeleted(true);
      } else {
         setNotification(false);
      }
   }, [data]);

   return (
      <>
         <Portal>
            {notification && (
               <Notification
                  cta={{ handleClose: () => setNotification(false) }}
                  type='4'
                  title={errorMessages.posts.failedToDeleteFolder.title}
                  body={errorMessages.posts.failedToDeleteFolder.body}
               />
            )}

            {showModal && (
               <SelectFolderOptions
                  cta={{
                     handleCloseModal: () => setShowModal(!showModal),
                     handleDelete: (id) => handleDelete(id, CONTENT_TYPE_FOLDER),
                     handleEdit: () => router.push(`/users/folders/edit/${ID}`)
                  }}
                  folderId={ID}
               />
            )}
         </Portal>

         {!isDeleted && (
            <div className={`shadow-s ${style.mainWrapper} ${className}`}>
               <div className={style.imageWrapper}>
                  {thumbnail && (
                     <Image
                        src={thumbnail}
                        alt='thumbnail for a book of the bible'
                        layout='fill'
                        defaultValue={""}
                     />
                  )}
               </div>
               <div className={style.folderName}>
                  <Parragraph text={folderName} size='main' />
               </div>

               <div className={style.postCount}>
                  <div className={style.icon} onClick={() => setShowModal(!showModal)}>
                     <Icon name='ellipsisH' color={FONT_COLOR} />
                  </div>
                  <div className={style.countInt}>
                     <Parragraph text={postCount} bold size='main' />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
