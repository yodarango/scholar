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

type TFolderListProps = {
   isSelf?: boolean;
   cta?: {
      handleFolderSelection?: (id: string | number) => void;
      handleClose?: () => void;
   };
};

const FOLDER_SELECT = 1;
const FOLDER_SELECT_ALL = 2;
export const FolderList = ({ isSelf, cta }: TFolderListProps) => {
   const router = useRouter();
   const { data, status } = useGetFolders({ isSelf, query_type: "my-folders" });
   const [folders, setFolders] = useState<any[] | null>([]);
   const [selectFolderActive, setSelectFolderActive] = useState<number | boolean>(false);

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
         setSelectFolderActive(false);
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

   return (
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
                  <IconButton icon='add' backgroundColor='2' link='/users/folders/new' />
               </div>
            </div>

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
            {status === "done" && (
               <div className={styles.foldersWrapper}>
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
