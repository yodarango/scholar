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
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";
import { Error } from "../../../common/feedback/error";
import { Empty } from "../../../common/feedback/empty";

type TCommentaryOneLineCarrouselProps = {
   userID?: string;
   loadingState?: string;
   commentaries?: TCommentary[];
   authorityLevel?: string;
};
export const CommentaryOneLineCarrousel = ({
   commentaries,
   loadingState = "loading",
   authorityLevel
}: TCommentaryOneLineCarrouselProps) => {
   // router
   const router = useRouter();

   // components
   const [commentariesArr, setcommentariesArr] = useState<TCommentary[]>(commentaries || []);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: any) => {
      setloading("loading");

      if (variables?.category) variables.category_tags = variables.category;

      try {
         const { data, status } = await handleGetCommentaries(variables);

         if (data) {
            setcommentariesArr(data);

            data.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }

         setloading(status);
         setsmallLoader(false);
      } catch (error) {
         console.error(error);
         setcommentariesArr([]);
         setloading("error");
      }
   };

   useEffect(() => {
      let isMounted = false;

      if (router.isReady && !isMounted && !router?.query?.view) {
         const USER_ID = router?.query?.signature === "@me" ? null : router?.query?.signature;
         const vars: any = {
            last_id: CONTENT_LAST_ID,
            USER_ID
         };

         if (commentaries) {
            setcommentariesArr(commentaries);
         } else fetchData(vars);
      }
      return () => {
         isMounted = true;
      };
   }, [router.isReady, router.query]);

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
         {loading === "done" && commentariesArr?.length === 0 && (
            <div className={styles.error}>
               <Empty />
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
