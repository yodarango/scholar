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
   userID?: string;
   thoughts?: TThought[];
};

export const ThoughtsOneLineCarrousel = ({ thoughts, userID }: TThoughtsOneLineCarrouselProps) => {
   // state
   const [thoughtsArr, setThoughtsArr] = useState<TThought[] | undefined>(thoughts);
   const [loading, setloading] = useState<string>("loading");

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
      }
   }, []);
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
