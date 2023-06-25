/**************************************************************************************** 
-  displays grid of commentaries.
-  Pages that render this modal include at least /read and posts/commentaries/
-  If the props verseId is passed the call to the API will not use the query value
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import { GridPrimary } from "../grid_primary";
import { Commentary } from "../../../fragments/cards/posts/commentary";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";
import { Primary } from "../../../fragments/buttons/primary";
import { SmallLoader } from "../../../fragments/chunks/small_loader";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TCommentary } from "../../../../types/posts";
import {
   handleGetCommentaries,
   TgetcommentariesVariables
} from "../../../../helpers/functions/posts/commentary_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";
import { Empty } from "../../../common/feedback/empty";

type TCommentariesGridProps = {
   verseId?: string; // not used by any comps at the moment
   verseCitation?: string;
   verse?: string;
   getAll?: boolean;
   folderId?: string;
};

export const CommentariesGrid = ({
   verseId,
   verseCitation,
   verse,
   folderId,
   getAll
}: TCommentariesGridProps) => {
   // router
   const router = useRouter();

   // components
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [queryVariables, setqueryVariables] = useState<TgetcommentariesVariables>({
      last_id: CONTENT_LAST_ID,
      getAll: getAll,
      FOLDER_ID: folderId
   });
   const [routerSearchKeys, setRouterSearchKeys] = useState<string[]>([]);

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: any, isLoadMore: boolean) => {
      if (isLoadMore) {
         setshowloadMore(false);
         setsmallLoader(true);
      } else {
         setloading("loading");
      }

      // rename the query variables to match the API
      if (verseId) variables.VERSE_ID = verseId; // not being used at the time
      if (variables?.category) variables.category_tags = variables.category;
      if (variables?.folder) variables.FOLDER_ID = variables.folder;

      try {
         const { data, status } = await handleGetCommentaries(variables);

         if (data) {
            if (isLoadMore) setcommentaries((prev) => [...prev, ...data]);
            else setcommentaries(data);

            // if there were commentaries returned, update the last_id
            data.length > 0 &&
               setqueryVariables((prev) => ({ ...prev, last_id: data[data.length - 1].ID }));

            data.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }

         setloading(status);
         setsmallLoader(false);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   /***********************************************************************
    * since this renders only when the router changes or on initial render,
    *  we want to always fetch the initial CONTENT_LAST_ID 🌙
    * *******************************************************
    */
   useEffect(() => {
      let isMounted = false;

      // since the folder's view changes the router prevent it from fetching commentaries
      const isFoldersView = router?.query["group"] ? true : false;
      if (router.isReady && !isMounted && !isFoldersView) {
         const vars: any = { getAll: getAll, last_id: CONTENT_LAST_ID, ...router.query };

         // if the folderId is passed from the parent comp rather than from the query
         if (folderId) vars["folder"] = folderId;

         fetchData(vars, false);
      }
      return () => {
         isMounted = true;
      };
   }, [router.isReady, router.query]);

   // this is to check wheat status mascot to show
   useEffect(() => {
      if (router.isReady) {
         let keys = Object.keys(router.query);
         keys = keys.filter(
            (key) => !["view", "folder", "folder", "signature", "id"].includes(key)
         );
         setRouterSearchKeys(keys);
      }
   }, [router.query]);

   return (
      <div className={styles.mainWrapper}>
         {verseCitation && verse && (
            <div className={styles.verseWrapper}>
               <div className={styles.citation}>
                  <Header text={verseCitation} quiet={true} type={4} size='main' />
               </div>
               <div className={styles.verse}>
                  <Parragraph text={verse} size='main' />
               </div>
            </div>
         )}
         {loading === "done" && (
            <div className={styles.gridWrapper}>
               <GridPrimary>
                  {commentaries.map((commentary: TCommentary, index: number) => (
                     <div key={index} className={styles.child}>
                        <Commentary customWidth={true} commentary={commentary} />
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

         {routerSearchKeys.length > 0 && commentaries.length === 0 && loading === "done" && (
            <div className={styles.error}>
               <ResourceNotFound />
            </div>
         )}
         {routerSearchKeys.length === 0 && commentaries.length === 0 && loading === "done" && (
            <div className={styles.error}>
               <Empty />
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFound />
            </div>
         )}
      </div>
   );
};
