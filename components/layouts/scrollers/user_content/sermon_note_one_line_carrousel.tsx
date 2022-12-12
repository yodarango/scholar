import { useEffect, useState } from "react";

// comps
import { SermonNote } from "../../../fragments/cards/posts/sermon_note";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./sermon_note_one_line_carrousel.module.css";

//types
import { TSermonNote } from "../../../../types/posts";
import {
   handleGetSermonNotes,
   TgetSermonNotesVariables
} from "../../../../helpers/functions/posts/sermon_note_get";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

type TSermonOneLineCarrouselProps = {
   loadingState?: string;
   sermonNotes?: TSermonNote[];
   userID?: string;
};

export const SermonNoteOneLineCarrousel = ({
   loadingState = "done",
   sermonNotes,
   userID
}: TSermonOneLineCarrouselProps) => {
   // state
   const [sermonNotesArr, setsermonNotesArr] = useState<TSermonNote[] | undefined>(sermonNotes);
   const [loading, setloading] = useState<string>("loading");

   // will only run if the post was deleted successfully
   const handleDelete = (id: string) => {
      const updatedArr = sermonNotesArr?.filter((thought) => thought.ID !== id);
      setsermonNotesArr(updatedArr);
   };

   // fetch data
   const fetchData = async (variables: TgetSermonNotesVariables) => {
      try {
         const { data, status } = await handleGetSermonNotes(variables);
         data && setsermonNotesArr(data.sermon_note);
         console.log(data);
         setloading(status);
      } catch (error) {
         console.error(error);
         setsermonNotesArr([]);
         setloading("error");
      }
   };

   useEffect(() => {
      if (!sermonNotes) {
         fetchData({ USER_ID: userID, last_id: CONTENT_LAST_ID });
      } else {
         setsermonNotesArr(sermonNotes);
         setloading(loadingState);
      }
   }, [loadingState]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.carrousel}>
               {sermonNotesArr?.map((semonNote: TSermonNote, index: number) => (
                  <div className={styles.sermonNotes} key={index}>
                     <SermonNote sermonNote={semonNote} cta={{ handleDelete }} />
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
