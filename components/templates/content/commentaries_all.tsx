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
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const last_id = 9999999999;

   // fetch data
   const fetchData = async (variables: TgetcommentariesVariables) => {
      console.log("fetch Data");
      setloading("loading");
      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data && data.commentary) {
            // do this above for every filter this is so that I can filter when there is already filters in the query
            setcommentaries(data.commentary);
         }
         console.log(data);
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   const fetchMore = async (variables: TgetcommentariesVariables) => {
      console.log("fetch More");
      setshowloadMore;

      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data && data.commentary) {
            // filter tags
            let commentaries = data.commentary;

            if (variables.category_tags) {
               const filterTags = data.commentary.filter(
                  (post: TCommentary) => post.category_tags === variables.category_tags
               );
               console.log(filterTags);
               commentaries.push(...filterTags);
            }

            if (variables.AUTHORITY_LEVEL) {
               const filterAuthLevel = data.commentary.filter(
                  (post: TCommentary) => post.authority_level === variables.AUTHORITY_LEVEL
               );
               commentaries.push(...filterAuthLevel);
            }

            console.log(data.commentary);
            console.log(commentaries);

            // do this above for every filter this is so that I can filter wehn there is already filters in the query
            setcommentaries((prev: any) => [...prev, ...commentaries]);
         }
         setloading(status);
      } catch (error) {
         console.error(error);
      }
   };

   // load more
   useEffect(() => {
      if (Object.keys(router.query).length > 0) {
         if (router.query.last_id) {
            router.query.AUTHORITY_LEVEL
               ? fetchMore({ ...router.query })
               : fetchMore({ AUTHORITY_LEVEL: "0", ...router.query });
         } else {
            router.query.AUTHORITY_LEVEL
               ? fetchData({ last_id, ...router.query })
               : fetchData({ last_id, AUTHORITY_LEVEL: "0", ...router.query });
         }
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
               <CommentariesGrid commentaries={commentaries} showLoadMore={showloadMore} />
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
