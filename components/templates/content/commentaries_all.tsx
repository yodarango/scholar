import { useEffect, useState } from "react";

// components
import { CommentariesGrid } from "../../layouts/scrollers/user_content/commentaries_grid";
import { CommentaryFilter } from "../../fragments/commentary_filter";
import { SearchInputWCat } from "../../fragments/search_input_w_cat";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./commentaries_all.module.css";

// types
import { TCommentary } from "../../../types/posts";

// helpers
import { handleGetCommentaries } from "../../../helpers/functions/posts/commentary_get";

export const CommentariesAll = () => {
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [last_id, set_last_id] = useState<number>(9999999999);

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetCommentaries({ last_id });
         if (data && data.commentary) {
            setcommentaries(data.commentary);
            set_last_id(data.commentary.at(-1).ID);
         }
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat placeHolder='Search anything...' />
            </div>
            <div className={styles.filter}>
               <CommentaryFilter />
            </div>
         </div>
         {loading === "done" && commentaries.length > 0 && (
            <div className={styles.postsWrapper}>
               <CommentariesGrid commentaries={commentaries} />
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </div>
   );
};
