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
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
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

type TCommentariesGridProps = {
   verseId?: string; // not used by any comps at the moment
   verseCitation?: string;
   verse?: string;
   isSelf?: boolean;
};

export const CommentariesGrid = ({
   isSelf,
   verseId,
   verseCitation,
   verse
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
      isSelf: isSelf
   });

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
            data.length > 0 &&
               setqueryVariables({ last_id: data[data.length - 1].ID, isSelf: isSelf });

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
      if (router.isReady)
         fetchData({ last_id: CONTENT_LAST_ID, isSelf: isSelf, ...router.query }, false);
   }, [router.isReady, router.query]);

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
