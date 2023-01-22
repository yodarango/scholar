// components
import { useEffect } from "react";
import { SermonNoteEditor } from "../../../../templates/content/sermon_note_editor";

// styles
import styles from "./index.module.css";

const Index = () => {
   useEffect(() => {
      // fetch data
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <SermonNoteEditor renderClose={true} />
      </div>
   );
};

export default Index;
