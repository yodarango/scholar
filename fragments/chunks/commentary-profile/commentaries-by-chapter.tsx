// core
import Link from "next/link";

// styles
import commentaryByChatoperStyles from "../../../styles/fragments/chunks/commentaries-chapter/CommentariesByChapter.module.css";

type commentaryByChaopteProps = {
   chapterId: string;
   chapter: string | number;
   handleOpenCommentsByChapter?: any;
};

const CommentaryByChapter = ({ chapter, chapterId }: commentaryByChaopteProps) => {
   return (
      <Link href={`/users/commentaries/by-book/${chapterId}?chapter=${chapterId}`}>
         <a className={commentaryByChatoperStyles.mainWrapper}>
            <p className='std-text-block'>{chapter}</p>
         </a>
      </Link>
   );
};

export default CommentaryByChapter;
