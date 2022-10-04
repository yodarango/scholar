// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { SermonNoteOneLineCarrousel } from "../scrollers/user_content/sermon_note_one_line_carrousel";

// styles
import styles from "./wigo_sermons.module.css";

//types
import { TSermonNote } from "../../types/posts";

type TSermonOneLineCarrouselProps = {
   sermonNotes: TSermonNote[];
};

export const WigoSermons = ({ sermonNotes }: TSermonOneLineCarrouselProps) => {
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
            <SermonNoteOneLineCarrousel sermonNotes={sermonNotes} />
         </div>
      </div>
   );
};
