import commentaryByChatoperStyles from "../../../styles/fragments/chunks/commentaries-chapter/CommentariesByChapter.module.css";

type commentaryByChaopteProps = {
   chapterId: string;
   chapter: string | number;
   handleOpenCommentsByChapter?: any;
};
const CommentaryByChapter = ({
   handleOpenCommentsByChapter,
   chapter,
   chapterId
}: commentaryByChaopteProps) => {
   return (
      <div
         className={commentaryByChatoperStyles.mainWrapper}
         onClick={() => handleOpenCommentsByChapter(chapterId)}>
         <p className='std-text-block'>{chapter}</p>
      </div>
   );
};

export default CommentaryByChapter;
