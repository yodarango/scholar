import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
import { TgetcommentariesVariables } from "../../../helpers/functions/posts/commentary_get";

// helpers
import { handleGetCommentaries } from "../../../helpers/functions/posts/commentary_get";

export const CommentariesAll = () => {
   // router
   const router = useRouter();

   // components
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [last_id, set_last_id] = useState<number>(9999999999);

   // fetch data
   const fetchData = async (variables: TgetcommentariesVariables) => {
      setloading("loading");
      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data && data.commentary) {
            setcommentaries(data.commentary);
            data.commentary?.at(-1)?.ID
               ? set_last_id(data.commentary?.at(-1).ID)
               : set_last_id(9999999999);
         }
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   useEffect(() => {
      if (Object.keys(router.query).length > 0) {
         router.query.AUTHORITY_LEVEL
            ? fetchData({ last_id, ...router.query })
            : fetchData({ last_id, AUTHORITY_LEVEL: "0", ...router.query });
      } else {
         fetchData({ last_id });
      }
   }, [router.query, router.isReady]);

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
