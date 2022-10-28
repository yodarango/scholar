import { useEffect, useState } from "react";

// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { SermonNoteOneLineCarrousel } from "../scrollers/user_content/sermon_note_one_line_carrousel";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./wigo_sermons.module.css";

//types
import { TSermonNote } from "../../../types/posts";

// helpers
import { handleGetSermonNoteIn24 } from "../../../helpers/functions/posts/sermon_note_get";

export const WigoSermons = () => {
   const [sermonNotes, setsermonNotes] = useState<TSermonNote[]>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetSermonNoteIn24();
         data && setsermonNotes(data.sermon_note_in_24);
         setloading(status);
      } catch (error) {
         console.error(error);
         setsermonNotes([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Sermon notes' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/sermon-note"} />
            </div>
         </div>
         {loading === "done" && (
            <div className={styles.carrousel}>
               <SermonNoteOneLineCarrousel sermonNotes={sermonNotes} />
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
