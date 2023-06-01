import { useGetFolders } from "../../../helpers/functions/posts/use_get_folders";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { SearchInput } from "../../fragments/inputs/search_input";
import { FolderCard } from "../../fragments/cards/folder_card";
import { PrimaryStack } from "./templates/primary_stack";
import styles from "./folders_list.module.css";
import React, { useEffect, useState } from "react";
import { IconButton } from "../../fragments/buttons/icon_button";
import { useRouter } from "next/router";
import { Secondary } from "../../fragments/buttons/secondary";
import {
   DANGER_COLOR,
   FONT_COLOR,
   PRIMARY_COLOR,
   SAFE_COLOR,
   WARNING_COLOR
} from "../../../constants/tokens";
import { useBulkAction } from "../../../hooks/use_bulk_action";
import {
   BULK_ACTION_DELETE,
   BULK_ACTION_PRIVATE,
   BULK_ACTION_PUBLIC,
   CONTENT_TYPE_FOLDER
} from "../../../constants/defaults";
import { Notification } from "../../fragments/popups/notification";
import { notificationMessages } from "../../../data/notification_messages";
import { errorMessages } from "../../../data/error_messages";
import { SmallLoader } from "../../fragments/chunks/small_loader";

const errorMessage = errorMessages.posts.failToPerformBulkActionOnFolders;

type TFolderListProps = {
   userSignature?: string;
   includeBulkAction?: boolean;
   isPlacingPostInFolder?: string | number;
   cta?: {
      handleFolderSelection?: (id: string | number) => void;
      handleClose?: () => void;
   };
};

const FOLDER_SELECT = 1;
const FOLDER_SELECT_ALL = 2;
export const FolderList = ({
   includeBulkAction,

   cta,
   userSignature,
   isPlacingPostInFolder
}: TFolderListProps) => {
   const router = useRouter();
   const { data, status } = useGetFolders({ query_type: "my-folders" });
   const [folders, setFolders] = useState<any[] | null>([]);
   const [selectFolderActive, setSelectFolderActive] = useState<number | boolean>(false);
   const [showBulkBtns, setShowBulkBtns] = useState<boolean>(false);
   const [bulkActionLoading, setBulkActionLoading] = useState<boolean>(false);
   const [notification, setNotification] = useState<{
      title: string;
      type: string;
      body: string;
   } | null>(null);

   // strictly to update the items once the action has been executed because the updated data is not
   // returned from the BE 🤦‍♂️
   const [selectedBulkAction, setSelectedBulkAction] = useState<string | null>(null);

   useEffect(() => {
      setFolders(data);
   }, [data, status]);

   const handleFilterFolders = (val: string) => {
      const filteredFolders =
         data &&
         data.filter((folder: any) => folder.name.toLowerCase().includes(val.toLowerCase()));

      setFolders(filteredFolders);
   };

   const handleSelectAll = () => {
      if (selectFolderActive !== FOLDER_SELECT_ALL) {
         setSelectFolderActive(FOLDER_SELECT_ALL);
         if (data) setFolders(data.map((folder: any) => ({ ...folder, selected: true })));
      } else {
         setSelectFolderActive(0);
         if (data) setFolders(data.map((folder: any) => ({ ...folder, selected: false })));
      }
   };

   const handleSelect = (index: number, id?: number | string, type?: number) => {
      if (type === FOLDER_SELECT) {
         if (selectFolderActive === FOLDER_SELECT) {
            setFolders(data);
            setSelectFolderActive(false);
         } else setSelectFolderActive(FOLDER_SELECT);
      } else if (data && id) {
         // find this post
         let selection = folders?.find((folder: any) => folder.ID === id);

         // check if it has already been selected and assign the value accordingly
         selection =
            selection && selection.selected
               ? { ...selection, selected: false }
               : { ...selection, selected: true };

         let removeExisting = folders?.filter((folder: any) => folder.ID !== id) || [];

         removeExisting.splice(index, 0, selection);

         setFolders(removeExisting);
      }

      // fr when a user moves directly from 'select all' to 'select'
      if (selectFolderActive === FOLDER_SELECT_ALL && !id) {
         setFolders(data);
      }
   };

   const bulkAction = useBulkAction();

   const handleExecuteBulk = (action: string) => {
      setBulkActionLoading(true);
      setSelectedBulkAction(action);

      let selectedFolders = folders?.filter((folder: any) => folder?.selected === true);
      selectedFolders = selectedFolders?.map((folder: any) => folder?.ID);

      if (selectedFolders) {
         bulkAction.goDo({
            action: action,
            IDs: selectedFolders,
            contentType: CONTENT_TYPE_FOLDER
         });
      }
   };

   useEffect(() => {
      if (bulkAction.status === "success") {
         setBulkActionLoading(false);

         // TODO: It is not a great thing to update content in the Front end, please fix this. Make the BE return the
         // TODO:  updated data instead
         if (selectedBulkAction === BULK_ACTION_DELETE) {
            setNotification({
               title: notificationMessages.foldersDeleted.title,
               type: "2",
               body: notificationMessages.foldersDeleted.body
            });

            const updatedData = folders?.filter((folder: any) => folder?.selected !== true) || [];
            setFolders(updatedData);
         }
         if (selectedBulkAction === BULK_ACTION_PRIVATE) {
            setNotification({
               title: notificationMessages.foldersMadePrivate.title,
               type: "2",
               body: notificationMessages.foldersMadePrivate.body
            });

            const updatedData =
               folders?.map((folder: any) => ({ ...folder, is_private: true })) || [];
            setFolders(updatedData);
         }
         if (selectedBulkAction === BULK_ACTION_PUBLIC) {
            setNotification({
               title: notificationMessages.foldersMadePublic.title,
               type: "2",
               body: notificationMessages.foldersMadePublic.body
            });
            const updatedData =
               folders?.map((folder: any) => ({ ...folder, is_private: false })) || [];
            setFolders(updatedData);
         }
      } else if (bulkAction.status === "error") {
         setNotification({
            title: errorMessage.title,
            type: "4",
            body: errorMessage.body
         });
         setBulkActionLoading(false);
      }
   }, [bulkAction.status]);

   useEffect(() => {
      if (folders && folders.length > 0) {
         const selectedFolders = folders?.filter((folder: any) => folder?.selected === true);
         if (selectedFolders && selectedFolders.length > 0) setShowBulkBtns(true);
         else setShowBulkBtns(false);
      } else setShowBulkBtns(false);
   }, [folders]);

   return (
      <>
         {notification && (
            <Notification
               title={notification.title}
               cta={{ handleClose: () => setNotification(null) }}
               type={notification.type}
               body={notification.body}
            />
         )}
         <PrimaryStack
            title='My folders'
            icon='folder'
            cta={{ handleClose: cta?.handleClose ? cta?.handleClose : () => router.back() }}>
            <>
               <div className={styles.searchAdd}>
                  <SearchInput
                     placeholder='Search folder'
                     bounceTime={100}
                     maxL={100}
                     cta={{ handleOnChange: handleFilterFolders }}
                  />
                  <div className={styles.add}>
                     <IconButton
                        icon='add'
                        backgroundColor='2'
                        link={`/users/${userSignature}/folders/new`}
                     />
                  </div>
               </div>

               {/* bulk options: optional */}
               {includeBulkAction && (
                  <div className={styles.bulkActions}>
                     <div className={styles.selectButtons}>
                        <Secondary
                           title='Select'
                           type={selectFolderActive === 1 ? "2" : "1"}
                           cta={{ handleClick: () => handleSelect(0, undefined, FOLDER_SELECT) }}
                        />
                        <Secondary
                           title='Select all'
                           type={selectFolderActive === 2 ? "2" : "1"}
                           cta={{ handleClick: handleSelectAll }}
                        />
                     </div>

                     {showBulkBtns && !bulkActionLoading && (
                        <div className={styles.actionBtns}>
                           <IconButton
                              icon='delete'
                              iconColor={PRIMARY_COLOR}
                              background={`linear-gradient(180deg, ${DANGER_COLOR}, ${FONT_COLOR})`}
                              custombuttonSize={{
                                 width: "3rem",
                                 height: "3rem",
                                 borderRadius: ".8em"
                              }}
                              cta={{ handleClick: () => handleExecuteBulk(BULK_ACTION_DELETE) }}
                           />
                           <IconButton
                              icon='lockClosed'
                              iconColor={PRIMARY_COLOR}
                              background={`linear-gradient(180deg, ${SAFE_COLOR}, ${FONT_COLOR})`}
                              custombuttonSize={{
                                 width: "3rem",
                                 height: "3rem",
                                 borderRadius: ".8em"
                              }}
                              cta={{ handleClick: () => handleExecuteBulk(BULK_ACTION_PRIVATE) }}
                           />
                           <IconButton
                              icon='lockOpen'
                              iconColor={PRIMARY_COLOR}
                              background={`linear-gradient(180deg, ${WARNING_COLOR}, ${FONT_COLOR})`}
                              custombuttonSize={{
                                 width: "3rem",
                                 height: "3rem",
                                 borderRadius: ".8em"
                              }}
                              cta={{ handleClick: () => handleExecuteBulk(BULK_ACTION_PUBLIC) }}
                           />
                        </div>
                     )}
                     {showBulkBtns && bulkActionLoading && (
                        <div className={styles.smallLoader}>
                           <SmallLoader />
                        </div>
                     )}
                  </div>
               )}

               {status === "done" && (
                  <div
                     className={`${styles.foldersWrapper} ${
                        showBulkBtns ? styles.bulkActive : ""
                     }`}>
                     {folders &&
                        folders.map((folder, i: number) => (
                           <div
                              key={i}
                              className={`${styles.folder} 
                              ${folder?.selected ? styles.selectedFolder : ""}
                              ${
                                 isPlacingPostInFolder === parseInt(folder.ID)
                                    ? styles.postInFolder
                                    : ""
                              }
                              `}>
                              <FolderCard
                                 cta={{
                                    handleClick: () => {
                                       selectFolderActive
                                          ? handleSelect(i, folder.ID, undefined)
                                          : cta &&
                                            cta?.handleFolderSelection &&
                                            cta?.handleFolderSelection(folder.ID);
                                    }
                                 }}
                                 smallDescription={
                                    isPlacingPostInFolder === parseInt(folder.ID)
                                       ? "currently in this folder"
                                       : undefined
                                 }
                                 userSignature={userSignature}
                                 thumbnail={folder.image}
                                 folderName={folder.name}
                                 postCount={folder.post_count}
                                 isPrivate={folder.is_private}
                                 ID={folder.ID}
                              />
                           </div>
                        ))}
                  </div>
               )}
               {status === "error" && <div>#NEEDSGRAPHICS</div>}
               {status === "loading" && (
                  <div className={styles.loader}>
                     <RoundLoader />
                  </div>
               )}
            </>
         </PrimaryStack>
      </>
   );
};
