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
   console.log(isSelf);
   // router
   const router = useRouter();

   // components
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [isFirstLoad, setisFirstLoad] = useState(true);
   const [queryVariables, setqueryVariables] = useState<TgetcommentariesVariables>({
      isSelf,
      last_id: CONTENT_LAST_ID
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: any) => {
      setloading("loading");

      if (verseId) variables.VERSE_ID = verseId;

      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data) {
            setcommentaries(data);
            data.length > 0 &&
               setqueryVariables({ ...queryVariables, last_id: data[data.length - 1].ID });

            data.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }
         setisFirstLoad(false);
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   //fetch data any time any of the query params change.
   // const fetchOnQueryChange = async (variables: TgetcommentariesVariables) => {
   //    setshowloadMore(false);
   //    setloading("loading");

   //    if (verseId) variables.VERSE_ID = verseId;

   //    try {
   //       const { data, status } = await handleGetCommentaries(variables);
   //       if (data) {
   //          setcommentaries(data);
   //          data.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
   //          setloading(status);
   //          setisFirstLoad(false);
   //       }
   //    } catch (error) {
   //       setcommentaries([]);
   //       setloading("error");
   //       console.error(error);
   //    }
   // };

   // only fetches more posts with whatever params are there in the router
   // const fetchMore = async (variables: TgetcommentariesVariables) => {
   //    setshowloadMore(false);
   //    setsmallLoader(true);

   //    if (verseId) variables.VERSE_ID = verseId;

   //    try {
   //       const { data, status } = await handleGetCommentaries(variables);
   //       if (data) {
   //          // filter tags
   //          let moreCommentaries = data;

   //          // update query variables
   //          moreCommentaries.length > 0 &&
   //             setqueryVariables({
   //                ...queryVariables,
   //                last_id: moreCommentaries[moreCommentaries.length - 1].ID
   //             });

   //          setcommentaries((prev) => [...prev, ...moreCommentaries]);
   //          moreCommentaries.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
   //          setsmallLoader(false);
   //          setisFirstLoad(false);
   //       }
   //    } catch (error) {
   //       setcommentaries([]);
   //       console.error(error);
   //    }
   // };

   // calls fetchData only on initial load
   useEffect(() => {
      if (router.isReady) fetchData({ ...queryVariables, ...router.query });
   }, [router.isReady]);

   // //call on query params change only. Avoid calling on first oad
   // useEffect(() => {
   //    if (router.isReady && !isFirstLoad)
   //       fetchOnQueryChange({ ...router.query, last_id: CONTENT_LAST_ID });
   // }, [router.query]);

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
                           handleClick: () =>
                              fetchMore({
                                 ...router.query,
                                 last_id: commentaries[commentaries.length - 1].ID
                              })
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
