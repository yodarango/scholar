import {
   useGetFolders,
   useGetFoldersUnHooked
} from "../../../helpers/functions/posts/use_get_folders";
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
import { loggedInUser } from "../../../helpers/auth/get-loggedin-user";
import { YouNeedToLoginModal } from "../../common/modals/you_need_to_login_modal";
import { Error } from "../../common/feedback/error";
import { Empty } from "../../common/feedback/empty";
import { ResourceNotFound } from "../../common/feedback/resource_not_found";

const errorMessage = errorMessages.posts.failToPerformBulkActionOnFolders;

type TFolderListProps = {
   includeBulkAction?: boolean;
   isPlacingPostInFolder?: string | number;
   cta?: {
      handleFolderSelection?: (id: string | number) => void;
      handleClose?: () => void;
   };
};

const FOLDER_SELECT = 1;
const FOLDER_SELECT_ALL = 2;
export const FolderList = ({ includeBulkAction, cta, isPlacingPostInFolder }: TFolderListProps) => {
   const router = useRouter();
   const userSignature = router?.query?.signature as string;

   // original list of folders
   const [foldersNoMut, setFoldersNoMut] = useState<any[] | null>([]);
   const [folders, setFolders] = useState<any[] | null>([]);
   const [status, setStatus] = useState<string>("");
   const [selectFolderActive, setSelectFolderActive] = useState<number | boolean>(false);
   const [showBulkBtns, setShowBulkBtns] = useState<boolean>(false);
   const [bulkActionLoading, setBulkActionLoading] = useState<boolean>(false);
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [notification, setNotification] = useState<{
      title: string;
      type: string;
      body: string;
   } | null>(null);
   const [filter, setFilter] = useState<string>("");

   // strictly to update the items once the action has been executed because the updated data is not
   // returned from the BE 🤦‍♂️
   const [selectedBulkAction, setSelectedBulkAction] = useState<string | null>(null);

   const handleGetData = async (variables: any) => {
      if (!variables.USER_ID || variables.USER_ID === "@me") {
         const { data, status } = await useGetFoldersUnHooked({
            query_type: "my-folders"
         });
         setFolders(data);
         setFoldersNoMut(data);
         setStatus(status);
      } else {
         const { data, status } = await useGetFoldersUnHooked({
            USER_ID: router.query.signature as string,
            query_type: "my-folders"
         });
         setFolders(data);
         setStatus(status);
      }
   };

   const handleFilterFolders = (val: string) => {
      const filteredFolders =
         foldersNoMut &&
         foldersNoMut.filter((folder: any) =>
            folder.name.toLowerCase().includes(val.toLowerCase())
         );

      setFilter(val);
      setFolders(filteredFolders);
   };

   const handleSelectAll = () => {
      if (selectFolderActive !== FOLDER_SELECT_ALL) {
         setSelectFolderActive(FOLDER_SELECT_ALL);
         if (folders) setFolders(folders.map((folder: any) => ({ ...folder, selected: true })));
      } else {
         setSelectFolderActive(0);
         if (folders) setFolders(folders.map((folder: any) => ({ ...folder, selected: false })));
      }
   };

   const handleSelect = (index: number, id?: number | string, type?: number) => {
      if (type === FOLDER_SELECT) {
         // this means the folder is selected
         if (selectFolderActive === FOLDER_SELECT) {
            const removeSelection = folders?.map((folder: any) => ({
               ...folder,
               selected: false
            }));

            setFolders(removeSelection || folders);

            setSelectFolderActive(false);
         } else setSelectFolderActive(FOLDER_SELECT);
      } else if (folders && id) {
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
         setFolders(folders);
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

   useEffect(() => {
      if (router.isReady && router.query) {
         handleGetData({ USER_ID: router.query.signature as string, query_type: "my-folders" });
      }
   }, [router.isReady, router.query]);

   const handleAddNewFolder = () => {
      const user = loggedInUser();

      if (!user) setOpenModal(true);
      else router.push(`/users/@me/folders/new`);
   };

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
         <YouNeedToLoginModal open={openModal} onClose={() => setOpenModal(false)} />
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
                        cta={{ handleClick: handleAddNewFolder }}
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
                                       if (selectFolderActive) {
                                          handleSelect(i, folder.ID, undefined);
                                       } else if (cta?.handleFolderSelection) {
                                          cta?.handleFolderSelection(folder.ID);
                                       } else {
                                          router.push(
                                             `/users/${userSignature}/folders/${folder.ID}`
                                          );
                                       }
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
               {status === "done" && folders?.length === 0 && filter !== "" && (
                  <div className={styles.feedback}>
                     <ResourceNotFound />
                  </div>
               )}
               {status === "done" && folders?.length === 0 && filter === "" && (
                  <div className={styles.feedback}>
                     <Empty />
                  </div>
               )}
               {status === "error" && (
                  <div className={styles.feedback}>
                     <Error />
                  </div>
               )}
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
