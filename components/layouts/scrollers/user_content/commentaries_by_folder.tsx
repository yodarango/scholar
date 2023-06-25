import React, { useEffect, useState } from "react";
import { useGetFolders } from "../../../../helpers/functions/posts/use_get_folders";
import { FolderCard } from "../../../fragments/cards/folder_card";
import { RoundLoader } from "../../../fragments/chunks/round_loader";

import styles from "./commentaries_by_folder.module.css";
import { SearchInput } from "../../../fragments/inputs/search_input";
import { CURRENT_VIEW_BOOK_BY_BOOK } from "../../stacks/commentaries_w_filter";
import { Empty } from "../../../common/feedback/empty";
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";

type TCommentariesByBookProps = {
   query_type: string;
   cta: {
      handleSelection: (id: string | number) => void;
   };
};

export const CommentariesByFolder = ({ query_type, cta }: TCommentariesByBookProps) => {
   const { data, status } = useGetFolders({ query_type });
   const [filter, setFilter] = useState("");
   const [folders, setFolders] = useState<any>([]);

   useEffect(() => {
      let filteredFolders;
      if (data) {
         if (filter !== "") {
            filteredFolders = data.filter((folder: any) =>
               folder.name.toLowerCase().includes(filter.toLowerCase())
            );
         } else {
            filteredFolders = data;
         }
      }

      setFolders(filteredFolders);
   }, [filter, data]);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.input}>
            <SearchInput
               placeholder='Search folder'
               bounceTime={100}
               maxL={100}
               cta={{ handleOnChange: (val) => setFilter(val) }}
            />
         </div>

         {status === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}

         {status === "done" && folders.length === 0 && filter === "" && (
            <div className={styles.feedback}>
               <Empty />
            </div>
         )}

         {status === "done" && folders.length === 0 && filter !== "" && (
            <div className={styles.feedback}>
               <ResourceNotFound />
            </div>
         )}

         {status === "done" &&
            folders &&
            folders.length > 0 &&
            folders.map((folder: any, i: number) => (
               <div key={i}>
                  <FolderCard
                     ID={folder.ID}
                     folderName={folder.name}
                     postCount={folder.post_count}
                     thumbnail={folder.image}
                     showEdit={query_type !== CURRENT_VIEW_BOOK_BY_BOOK}
                     cta={{
                        handleClick: () => cta.handleSelection(folder.ID)
                     }}
                  />
               </div>
            ))}
      </div>
   );
};
