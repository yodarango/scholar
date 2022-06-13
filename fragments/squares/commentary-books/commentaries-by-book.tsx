//styles
import { MouseEventHandler } from "react";
import commentsByBookStyles from "../../../styles/fragments/squares/commentary-books/CommentsByBooks.module.css";

type commentaryByBookProps = {
   bookTitle: string;
   bookBkg: string;
   totalComments: number | null;
   openSelectedBookChapters: MouseEventHandler<HTMLDivElement>;
};
const CommentariesByBook = ({
   bookTitle,
   bookBkg,
   totalComments,
   openSelectedBookChapters
}: commentaryByBookProps) => {
   return (
      <div className={commentsByBookStyles.mainWrapper} onClick={openSelectedBookChapters}>
         <div className={commentsByBookStyles.header}>
            <p>{bookTitle}</p>
         </div>
         <div className={commentsByBookStyles.bkg} style={{ backgroundImage: bookBkg }}></div>
         <div className={commentsByBookStyles.footer}>
            <p className='std-text-block--widget '>Comments: {totalComments}</p>
         </div>
      </div>
   );
};

export default CommentariesByBook;
