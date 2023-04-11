import React, { useEffect, useState } from "react";
import { useGetFolders } from "../../../../helpers/functions/posts/use_get_folders";
import { FolderCard } from "../../../fragments/cards/folder_card";
import { RoundLoader } from "../../../fragments/chunks/round_loader";

import styles from "./commentaries_by_folder.module.css";
import { SearchInput } from "../../../fragments/inputs/search_input";

type TCommentariesByBookProps = {
   isSelf?: boolean;
   query_type: string;
   cta: {
      handleSelection: (id: string | number) => void;
   };
};
export const CommentariesByFolder = ({ isSelf, query_type, cta }: TCommentariesByBookProps) => {
   const [folders, setFolders] = useState<any[] | null>([]);
   const { data, status } = useGetFolders({ isSelf, query_type });
   console.log("data", data);

   const handleFilterFolders = (val: string) => {
      const filteredFolders =
         data &&
         data.filter((folder: any) => folder.name.toLowerCase().includes(val.toLowerCase()));

      setFolders(filteredFolders);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.input}>
            <SearchInput
               placeholder='Search folder'
               bounceTime={500}
               maxL={100}
               cta={{ handleOnChange: handleFilterFolders }}
            />
         </div>

         {status === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {status === "done" &&
            folders &&
            folders.length > 0 &&
            folders.map((folder, i) => (
               <div key={i} onClick={() => cta.handleSelection(folder.ID)}>
                  <FolderCard
                     ID={folder.ID}
                     folderName={folder.name}
                     postCount={folder.post_count}
                     thumbnail={folder.image}
                  />
               </div>
            ))}
      </div>
   );
};
