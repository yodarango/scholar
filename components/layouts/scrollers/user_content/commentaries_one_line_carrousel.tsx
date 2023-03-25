/**************************************************************************************** 
-  Renders commentaries on a a one line carrousel and if no commentaries are passed then 
   the local fetch is called. 
-  PROP: Commentaries: the optional props that if passed does not trigger the local fetch
-  PROP: loadingState: the state of the outside call. If not paused it defaults to "loading"
-  PROP: userID is passed the function is called for a particular user
****************************************************************************************/

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// comps
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

import { TCommentary } from "../../../../types/posts";
import {
   handleGetCommentaries,
   TgetcommentariesVariables
} from "../../../../helpers/functions/posts/commentary_get";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

type TCommentaryOneLineCarrouselProps = {
   isSelf?: boolean;
   userID?: string;
   loadingState?: string;
   commentaries?: TCommentary[];
};
export const CommentaryOneLineCarrousel = ({
   isSelf,
   commentaries,
   loadingState = "loading"
}: TCommentaryOneLineCarrouselProps) => {
   // router
   const router = useRouter();

   // components
   const [commentariesArr, setcommentariesArr] = useState<TCommentary[] | undefined>(commentaries);
   const [loading, setloading] = useState<string>(loadingState);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [queryVariables, setqueryVariables] = useState<TgetcommentariesVariables>({
      AUTHORITY_LEVEL: 0,
      last_id: CONTENT_LAST_ID,
      isSelf: isSelf
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: TgetcommentariesVariables) => {
      setloading("loading");
      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data) {
            setcommentariesArr(data);
            data.length > 0 &&
               setqueryVariables({
                  ...queryVariables,
                  last_id: data[data.length - 1].ID
               });
         }
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentariesArr([]);
         setloading("error");
      }
   };

   //fetch data any time any of the query params change.
   const fetchOnQueryChange = async (variables: TgetcommentariesVariables) => {
      setloading("loading");

      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data) {
            setcommentariesArr(data);

            setloading(status);
         }
      } catch (error) {
         setcommentariesArr([]);
         setloading("error");
         console.error(error);
      }
   };

   // only call on query params change and not on first load
   // make sure it does not get called on first load
   const isFirstLoad = useRef(1);
   useEffect(() => {
      if (!router?.query?.view) {
         if (!commentaries) {
            if (router.isReady && isFirstLoad.current >= 3)
               fetchOnQueryChange({ ...router.query, last_id: CONTENT_LAST_ID });
         }
      }
      return () => {
         isFirstLoad.current = isFirstLoad.current + 1;
      };
   }, [router.query]);

   // only call fetch data on initial load
   useEffect(() => {
      if (router.isReady) {
         if (!router?.query?.view) {
            if (!commentaries) {
               if (router.query.AUTHORITY_LEVEL)
                  router.query.last_id
                     ? fetchData({ ...router.query })
                     : fetchData({ ...queryVariables, ...router.query });
               else if (!router.query.AUTHORITY_LEVEL)
                  router.query.last_id
                     ? fetchData({ ...router.query })
                     : fetchData({ ...queryVariables, ...router.query });
            }
         } else {
            setcommentariesArr(commentaries), setloading(loadingState);
         }
      }
   }, [loadingState, router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.carrousel}>
               {commentariesArr?.map((commentary: TCommentary, index: number) => (
                  <div className={styles.commentary} key={index}>
                     <Commentary commentary={commentary} />
                  </div>
               ))}

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
         {loading === "error" && <div className={styles.error}>{/* #NEEDS GRAPHICS */}</div>}
      </div>
   );
};
