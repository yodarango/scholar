import chapterStyles from "../../../../../styles/pages/users/commentaries/book/Chapter.module.css";
import { CommentariesByChapter } from "../../../../../templates/users/userId/commentaries/book/commentaries-by-chapter";

const Chapter = () => {
   return (
      <div className={chapterStyles.mainWrapper}>
         <CommentariesByChapter />
      </div>
   );
};

export default Chapter;
