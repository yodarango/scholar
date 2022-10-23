import { useEffect, useState } from "react";

// comps
import { Commentary } from "../../../fragments/cards/posts/commentary";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

//helpers
import { handleGetCommentariesIn24 } from "../../../../helpers/functions/posts/commentary_get";

//types
import { TCommentary } from "../../../../types/posts";

export const CommentaryOneLineCarrousel = () => {
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetCommentariesIn24();
         data && setcommentaries(data.commentary_in_24);
         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (id: string) => {
      const updatedArr = commentaries.filter((thought) => thought.ID !== id);
      setcommentaries(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.carrousel}>
               {commentaries.map((commentary: TCommentary, index: number) => (
                  <div className={styles.commentary} key={index}>
                     <Commentary commentary={commentary} cta={{ handleDelete }} />
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
