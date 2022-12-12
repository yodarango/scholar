/**************************************************************************************** 
-  Renders commentaries on a a one line carrousel and if no quotes are passed then 
   the local fetch is called. 
-  PROP: Commentaries: the optional props that if passed does not trigger the local fetch
-  PROP: loadingState: the state of the outside call. If not paused it defaults to "loading"
-  PROP: userID is passed the function is called for a particular user
****************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { Thought } from "../../../fragments/cards/posts/thought";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./thoughts_one_line_carrouse.module.css";

//helpers
import { TThought } from "../../../../types/posts";
import {
   handleGetThoughts,
   TgetThoughtsVariables
} from "../../../../helpers/functions/posts/thought_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

type TThoughtsOneLineCarrouselProps = {
   loadingState?: string;
   userID?: string;
   thoughts?: TThought[];
};

export const ThoughtsOneLineCarrousel = ({
   thoughts,
   userID,
   loadingState = "loading"
}: TThoughtsOneLineCarrouselProps) => {
   // state
   const [thoughtsArr, setThoughtsArr] = useState<TThought[] | undefined>(thoughts);
   const [loading, setloading] = useState<string>(loadingState);

   // will only run if the post was deleted successfully
   const handleDelete = (id: string) => {
      const updatedArr = thoughtsArr?.filter((thought) => thought.ID !== id);
      setThoughtsArr(updatedArr);
   };

   // fetch data
   const fetchData = async (variables: TgetThoughtsVariables) => {
      try {
         const { data, status } = await handleGetThoughts(variables);
         data && setThoughtsArr(data.thought);
         setloading(status);
      } catch (error) {
         console.error(error);
         setThoughtsArr([]);
         setloading("error");
      }
   };

   useEffect(() => {
      if (!thoughts) {
         fetchData({ USER_ID: userID, last_id: CONTENT_LAST_ID });
      } else {
         setThoughtsArr(thoughts);
         setloading(loadingState);
      }
   }, [loadingState]);
   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.carrousel}>
               {thoughtsArr?.map((thought: TThought, index: number) => (
                  <div className={styles.thought} key={index}>
                     <Thought thought={thought} cta={{ handleDelete }} />
                  </div>
               ))}
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
