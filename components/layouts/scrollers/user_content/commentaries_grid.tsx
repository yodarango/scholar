/**************************************************************************************** 
-  handles the query to display the posts to show in the user's profile based on the 
   user_authority prop
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import { GridPrimary } from "../grid_primary";
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TCommentary } from "../../../../types/posts";
import { Primary } from "../../../fragments/buttons/primary";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import {
   handleGetCommentaries,
   TgetcommentariesVariables
} from "../../../../helpers/functions/posts/commentary_get";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";

type TCommentariesGridProps = {
   verseCitation?: string;
   verse?: string;
   filters?: {
      folder?: string;
      verseId?: string;
      tag?: string;
   };
};

export const CommentariesGrid = ({ verseCitation, verse, filters }: TCommentariesGridProps) => {
   // router
   const router = useRouter();

   // components
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [queryVariables, setqueryVariables] = useState<TgetcommentariesVariables>({
      last_id: 999999999
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: TgetcommentariesVariables) => {
      setloading("loading");
      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data && data.commentary) {
            console.log(data);
            setcommentaries(data.commentary);
            console.log(data);
            data.commentary.length > 0 &&
               setqueryVariables({ last_id: data.commentary[data.commentary.length - 1].ID });

            data.commentary.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   //fetch data any time any of the query params change.
   const fetchOnQueryChange = async (variables: TgetcommentariesVariables) => {
      setshowloadMore(false);
      setloading("loading");

      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data && data.commentary) {
            setcommentaries(data.commentary);
            data.commentary.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
            setloading(status);
         }
      } catch (error) {
         setcommentaries([]);
         setloading("error");
         console.error(error);
      }
   };

   // only fetches more with whatever params are there in the router posts
   const fetchMore = async (variables: TgetcommentariesVariables) => {
      setshowloadMore(false);
      setsmallLoader(true);

      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data && data.commentary) {
            // filter tags
            let moreCommentaries = data.commentary;

            // update query variables
            moreCommentaries.length > 0 &&
               setqueryVariables({
                  ...queryVariables,
                  last_id: moreCommentaries[moreCommentaries.length - 1].ID
               });

            setcommentaries((prev) => [...prev, ...moreCommentaries]);
            moreCommentaries.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
            setsmallLoader(false);
         }
      } catch (error) {
         setcommentaries([]);
         console.error(error);
      }
   };

   // only call fetch data on initial load
   useEffect(() => {
      if (router.isReady)
         router.query.last_id
            ? fetchData({ ...router.query })
            : fetchData({ ...queryVariables, ...router.query });
   }, [router.isReady]);

   //call on query params change
   useEffect(() => {
      if (router.isReady) fetchOnQueryChange({ ...router.query, last_id: 999999999 });
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
                        <Commentary
                           customWidth={true}
                           cta={{
                              handleDelete: () => console.log("handle show post")
                           }}
                           commentary={commentary}
                        />
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
