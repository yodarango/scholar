import React, { useEffect } from "react";
import { useGetFolders } from "../../../../helpers/functions/posts/use_get_folders";
import { FolderCard } from "../../../fragments/cards/folder_card";
import { RoundLoader } from "../../../fragments/chunks/round_loader";

import styles from "./commentaries_by_folder.module.css";

type TCommentariesByBookProps = {
   isSelf?: boolean;
   query_type: string;
   cta: {
      handleSelection: (id: string | number) => void;
   };
};
export const CommentariesByFolder = ({ isSelf, query_type, cta }: TCommentariesByBookProps) => {
   const { data, status } = useGetFolders({ isSelf, query_type });

   return (
      <div className={styles.mainWrapper}>
         {status === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {status === "done" &&
            data &&
            data.length > 0 &&
            data.map((folder, i) => (
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
