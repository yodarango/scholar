/**************************************************************************************** 
- displays a grid of thoughts.
****************************************************************************************/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { GridPrimary } from "../grid_primary";
import { Thought } from "../../../fragments/cards/posts/thought";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { Primary } from "../../../fragments/buttons/primary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TThought } from "../../../../types/posts";

// helpers
import {
   handleGetThoughts,
   TgetThoughtsVariables
} from "../../../../helpers/functions/posts/thought_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

export const ThoughtsGrid = () => {
   // router
   const router = useRouter();

   // components
   const [thoughts, setthougts] = useState<TThought[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [queryVariables, setqueryVariables] = useState<TgetThoughtsVariables>({
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
         const { data, status } = await handleGetThoughts(variables);
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

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.gridWrapper}>
               <GridPrimary>
                  {thoughts.map((thought: TThought, index: number) => (
                     <div key={index} className={styles.child}>
                        <Thought thought={thought} />
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
