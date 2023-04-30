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
import { Parragraph } from "../../fragments/Typography/parragraph";
import {
   DANGER_COLOR,
   FONT_COLOR,
   PRIMARY_COLOR,
   SAFE_COLOR,
   WARNING_COLOR
} from "../../../constants/tokens";
import { useBulkAction } from "../../../hooks/use_bulk_action";
import { BULK_ACTION_DELETE, CONTENT_TYPE_FOLDER } from "../../../constants/defaults";
import { Notification } from "../../fragments/popups/notification";

type TFolderListProps = {
   isSelf?: boolean;
   userSignature?: string;
   includeBulkAction?: boolean;
   cta?: {
      handleFolderSelection?: (id: string | number) => void;
      handleClose?: () => void;
   };
};

const FOLDER_SELECT = 1;
const FOLDER_SELECT_ALL = 2;
export const FolderList = ({ includeBulkAction, isSelf, cta, userSignature }: TFolderListProps) => {
   const router = useRouter();
   const { data, status } = useGetFolders({ isSelf, query_type: "my-folders" });
   const [folders, setFolders] = useState<any[] | null>([]);
   const [selectFolderActive, setSelectFolderActive] = useState<number | boolean>(false);
   const [showBulkBtns, setShowBulkBtns] = useState<boolean>(false);
   const [notification, setNotification] = useState<{
      title: string;
      type: string;
      body: string;
   } | null>(null);

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

   const handleSelect = (id?: number | string, type?: number) => {
      if (type === FOLDER_SELECT) {
         if (selectFolderActive === FOLDER_SELECT) {
            setFolders(data);
            setSelectFolderActive(false);
         } else setSelectFolderActive(FOLDER_SELECT);
      } else if (data && id) {
         // find this post
         let selection = folders?.find((folder: any) => folder.ID === id);

         // check iff it has already been selected adn assign the value accordingly
         selection =
            selection && selection.selected
               ? { ...selection, selected: false }
               : { ...selection, selected: true };

         let removeExisting = folders?.filter((folder: any) => folder.ID !== id) || [];
         const updatedSelection = [...removeExisting, selection].sort((a, b) =>
            a.name.localeCompare(b.name)
         );

         setFolders(updatedSelection);
      }

      // fr when a user moves directly from 'select all' to 'select'
      if (selectFolderActive === FOLDER_SELECT_ALL && !id) {
         setFolders(data);
      }
   };

   const bulkAction = useBulkAction();

   const handleExecuteBulk = (action: string) => {
      let selectedFolders = folders?.filter((folder: any) => folder?.selected === true);
      selectedFolders = selectedFolders?.map((folder: any) => folder?.ID);

      //console.log(selectedFolders);
      if (selectedFolders) {
         bulkAction.goDo({
            action: BULK_ACTION_DELETE,
            IDs: selectedFolders,
            contentType: CONTENT_TYPE_FOLDER,
            isSelf
         });

         if (bulkAction.status === "success") {
            setNotification({
               title: "Success"
            });
         }
      }
   };

   useEffect(() => {
      if (folders && folders.length > 0) {
         const selectedFolders = folders?.filter((folder: any) => folder?.selected === true);
         if (selectedFolders && selectedFolders.length > 0) setShowBulkBtns(true);
         else setShowBulkBtns(false);
      } else setShowBulkBtns(false);
   }, [folders]);

   return (
      <PrimaryStack
         title='My folders'
         icon='folder'
         cta={{ handleClose: cta?.handleClose ? cta?.handleClose : () => router.back() }}>
         <>
            {notification && (
               <Notification title='title' cta={{ handleClose: () => {} }} type='1' body='test' />
            )}
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
                        cta={{ handleClick: () => handleSelect(undefined, FOLDER_SELECT) }}
                     />
                     <Secondary
                        title='Select all'
                        type={selectFolderActive === 2 ? "2" : "1"}
                        cta={{ handleClick: handleSelectAll }}
                     />
                  </div>

                  {showBulkBtns && (
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
                           cta={{ handleClick: () => handleExecuteBulk("delete") }}
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
                           cta={{ handleClick: () => handleExecuteBulk("private") }}
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
                           cta={{ handleClick: () => handleExecuteBulk("public") }}
                        />
                     </div>
                  )}
               </div>
            )}
            {status === "done" && (
               <div className={`${styles.foldersWrapper} ${showBulkBtns ? styles.bulkActive : ""}`}>
                  {folders &&
                     folders.map((folder, i: number) => (
                        <div
                           key={i}
                           className={`${styles.folder} ${
                              folder?.selected ? styles.selectedFolder : ""
                           }`}>
                           <FolderCard
                              cta={{
                                 handleClick: () =>
                                    selectFolderActive
                                       ? handleSelect(folder.ID, undefined)
                                       : cta &&
                                         cta.handleFolderSelection &&
                                         cta?.handleFolderSelection(folder.ID)
                              }}
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
   );
};
