// core
import Link from "next/link";

// styles
import commentaryByChatoperStyles from "../../../styles/fragments/chunks/commentaries-chapter/CommentariesByChapter.module.css";

type commentaryByChaopteProps = {
   chapterId: string;
   chapter: string | number;
   handleOpenCommentsByChapter?: any;
   userId: string | string[];
};

const CommentaryByChapter = ({ chapter, chapterId, userId }: commentaryByChaopteProps) => {
   return (
      <Link href={`/users/${userId}/commentaries/by-book/${chapterId}`}>
         <a className={commentaryByChatoperStyles.mainWrapper}>
            <p className='std-text-block'>{chapter}</p>
         </a>
      </Link>
   );
};

export default CommentaryByChapter;
