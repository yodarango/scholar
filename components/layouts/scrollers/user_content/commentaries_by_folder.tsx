import React, { useEffect } from "react";
import { useGetFolders } from "../../../../helpers/functions/posts/use_get_folders";
import { FolderCard } from "../../../fragments/cards/folder_card";
import { RoundLoader } from "../../../fragments/chunks/round_loader";

import styles from "./commentaries_by_folder.module.css";

type TCommentariesByBookProps = {
   isSelf?: boolean;
   folder_name: string;
};
export const CommentariesByFolder = ({ isSelf, folder_name }: TCommentariesByBookProps) => {
   const { data, status } = useGetFolders({ isSelf, name: folder_name });

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
               <FolderCard
                  key={i}
                  ID={folder.ID}
                  folderName={folder.name}
                  postCount={folder.post_count}
                  thumbnail={folder.image}
               />
            ))}
      </div>
   );
};
