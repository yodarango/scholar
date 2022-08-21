// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { SermonNoteOneLineCarrousel } from "../scrollers/sermon_note_one_line_carrousel";

// styles
import styles from "./fast_facts.module.css";

// types
import { TSermonNote } from "../../types/posts";

type TSermonNoteDisplayProps = {
   sermonNotes: TSermonNote[];
};

export const SermonNoteDisplay = ({ sermonNotes }: TSermonNoteDisplayProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Thoughts' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/thought"} />
            </div>
         </div>

         <div className={styles.sermonNote}>
            <SermonNoteOneLineCarrousel sermonNotes={sermonNotes} />
         </div>
      </div>
   );
};
