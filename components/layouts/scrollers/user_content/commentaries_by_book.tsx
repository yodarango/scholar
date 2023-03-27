import React, { useEffect } from "react";
import { getFolderPostCount } from "../../../../helpers/functions/posts/get_folders";

import styles from "./commentaries_by_book.module.css";

type TCommentariesByBookProps = {
   isSelf?: boolean;
   folder_name: string;
};
export const CommentariesByBook = ({ isSelf, folder_name }: TCommentariesByBookProps) => {
   const getData = async () => {
      try {
         const { data, status } = await getFolderPostCount({ isSelf: isSelf, name: folder_name });
         console.log(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getData();
   }, [folder_name]);

   return <div className={styles.mainWrapper}></div>;
};
