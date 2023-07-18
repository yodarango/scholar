/**************************************************************************************** 
- displays a grid of thoughts.
****************************************************************************************/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { GridPrimary } from "../grid_primary";
import { Article } from "../../../fragments/cards/posts/article";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { Primary } from "../../../fragments/buttons/primary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TArticle } from "../../../../types/posts";

// helpers
import {
   handleGetArticles,
   TgetArticlesVariables
} from "../../../../helpers/functions/posts/article_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";
import { Error } from "../../../common/feedback/error";

export const ArticlesGrid = () => {
   // router
   const router = useRouter();

   // components
   const [thoughts, setthougts] = useState<TArticle[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [routerSearchKeys, setRouterSearchKeys] = useState<string[]>([]);
   const [queryVariables, setqueryVariables] = useState<TgetArticlesVariables>({
      last_id: CONTENT_LAST_ID
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: any, isLoadMore: boolean) => {
      if (isLoadMore) {
         setshowloadMore(false);
         setsmallLoader(true);
      } else {
         setloading("loading");
      }

      if (variables?.category) variables.category_tags = variables.category;
      try {
         const { data, status } = await handleGetArticles(variables);
         if (data) {
            setthougts(data);
            data.length > 0 && setqueryVariables({ last_id: data[data.length - 1].ID });

            data.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }
         setloading(status);
         setsmallLoader(false);
      } catch (error) {
         console.error(error);
         setthougts([]);
         setloading("error");
      }
   };

   /***********************************************************************
    * since this renders only when the router changes or on initial render,
    *  we want to always fetch the initial CONTENT_LAST_ID 🌎
    * *******************************************************
    */
   useEffect(() => {
      if (router.isReady) fetchData({ last_id: CONTENT_LAST_ID, ...router.query }, false);
   }, [router.isReady, router.query]);

   useEffect(() => {
      if (router.isReady) {
         const keys = Object.keys(router.query);
         setRouterSearchKeys(keys);
      }
   }, [router.query]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.gridWrapper}>
               <GridPrimary>
                  {thoughts.map((thought: TArticle, index: number) => (
                     <div key={index} className={styles.child}>
                        <Article thought={thought} />
                     </div>
                  ))}
               </GridPrimary>
               {showloadMore && (
                  <div className={styles.loadMore}>
                     <Primary
                        title='Load more'
                        type='1'
                        cta={{
                           handleClick: () => fetchData(queryVariables, true)
                        }}
                     />
                  </div>
               )}

               {smallLoader && (
                  <div className={styles.smallLoader}>
                     <SmallLoader />
                  </div>
               )}
            </div>
         )}

         {routerSearchKeys.length > 0 && thoughts.length === 0 && loading === "done" && (
            <div className={styles.error}>
               <ResourceNotFound />
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <Error />
            </div>
         )}
      </div>
   );
};
