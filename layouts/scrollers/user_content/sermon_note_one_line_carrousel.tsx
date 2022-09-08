import { useState } from "react";

// comps
import { SermonNote } from "../../fragments/cards/posts/sermon_note";

// styles
import styles from "./sermon_note_one_line_carrousel.module.css";

//types
import { TSermonNote } from "../../types/posts";

type TSermonOneLineCarrouselProps = {
   sermonNotes: TSermonNote[];
};

export const SermonNoteOneLineCarrousel = ({ sermonNotes }: TSermonOneLineCarrouselProps) => {
   // state
   const [sermonNotesArr, setsermonNotesArr] = useState(sermonNotes);

   // will only run if the post was deleted successfully
   const handleDelete = (id: string) => {
      const updatedArr = sermonNotesArr.filter((sermonNotes) => sermonNotes.ID !== id);
      setsermonNotesArr(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {sermonNotesArr.map((semonNote: TSermonNote, index: number) => (
               <div className={styles.sermonNotes} key={index}>
                  <SermonNote sermonNote={semonNote} cta={{ handleDelete }} />
               </div>
            ))}
         </div>
      </div>
   );
};
