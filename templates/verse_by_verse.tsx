import { IconButton } from "../fragments/buttons/icon_button";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";
import { CommentaryFilter } from "../fragments/commentary_filter";
import { CommentaryOneLineCarrousel } from "../layouts/scrollers/user_content/commentaries_one_line_carrousel";
import { TCommentary } from "../types/posts";
import styles from "./verse_by_verse.module.css";

type TVerseByVerseProps = {
   commentaries: TCommentary[];
};
export const VerseByVerse = ({ commentaries }: TVerseByVerseProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.addBtn}>
         <IconButton backgroundColor="2" icon="add" link="/posts/commentary/new?close=verse-by-verse"/>
         </div>
         <div className={styles.verse}>
            <DailyVerseCard />
         </div>
         <div className={styles.filter}>
            <CommentaryFilter />
         </div>
         <div className={styles.commentaries}>
            <div className={styles.shadow}></div>
            <CommentaryOneLineCarrousel commentaries={commentaries} />
         </div>
      </div>
   );
};
