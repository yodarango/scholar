/**************************************************************************************** 
-  Renders commentaries on a a one line carrousel and if no quotes are passed then 
   the local fetch is called. 
-  PROP: Commentaries: the optional props that if passed does not trigger the local fetch
-  PROP: loadingState: the state of the outside call. If not paused it defaults to "loading"
-  PROP: userID is passed the function is called for a particular user
****************************************************************************************/

import { useEffect, useState } from "react";

// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { SermonNoteOneLineCarrousel } from "../scrollers/user_content/sermon_note_one_line_carrousel";

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
         <div className={styles.carrousel}>
            <SermonNoteOneLineCarrousel sermonNotes={sermonNotes} loadingState={loading} />
         </div>
      </div>
   );
};
