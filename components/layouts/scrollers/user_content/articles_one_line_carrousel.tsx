/**************************************************************************************** 
-  Renders commentaries on a a one line carrousel and if no quotes are passed then 
   the local fetch is called. 
-  PROP: Commentaries: the optional props that if passed does not trigger the local fetch
-  PROP: loadingState: the state of the outside call. If not paused it defaults to "loading"
-  PROP: userID is passed the function is called for a particular user
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { Article } from "../../../fragments/cards/posts/article";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";

// styles
import styles from "./articles_one_line_carrouse.module.css";

//helpers
import { TArticle } from "../../../../types/posts";
import {
   handleGetArticles,
   TgetArticlesVariables
} from "../../../../helpers/functions/posts/article_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";
import { Error } from "../../../common/feedback/error";
import { Empty } from "../../../common/feedback/empty";

type TArticlesOneLineCarrouselProps = {
   loadingState?: string;
   userID?: string | number;
   thoughts?: TArticle[];
};

export const ArticlesOneLineCarrousel = ({
   thoughts,
   userID,
   loadingState = "loading"
}: TArticlesOneLineCarrouselProps) => {
   const router = useRouter();
   // state
   const [thoughtsArr, setArticlesArr] = useState<TArticle[] | undefined>(thoughts);
   const [loading, setloading] = useState<string>(loadingState);

   // will only run if the post was deleted successfully
   const handleDelete = (id: string | number) => {
      const updatedArr = thoughtsArr?.filter((thought) => thought.ID !== id);
      setArticlesArr(updatedArr);
   };

   // fetch data
   const fetchData = async (variables: TgetArticlesVariables) => {
      try {
         const { data, status } = await handleGetArticles(variables);
         data && setArticlesArr(data);
         setloading(status);
      } catch (error) {
         console.error(error);
         setArticlesArr([]);
         setloading("error");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         const USER_ID =
            router?.query?.signature === "@me" ? undefined : (router?.query?.signature as string);
         if (!router?.query?.view) {
            if (!thoughts) {
               fetchData({
                  USER_ID: userID ? userID : USER_ID,
                  last_id: CONTENT_LAST_ID
               });
            } else {
               setArticlesArr(thoughts);
               setloading(loadingState);
            }
         }
      }
   }, [router.isReady, loadingState]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.carrousel}>
               {thoughtsArr?.map((thought: TArticle, index: number) => (
                  <div className={styles.thought} key={index}>
                     <Article thought={thought} cta={{ handleDelete }} />
                  </div>
               ))}
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}

         {loading === "done" && thoughtsArr?.length === 0 && (
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
