// core
import Link from "next/link";

//styles
import commentsByBookStyles from "../../../styles/fragments/squares/commentary-books/CommentsByBooks.module.css";

type commentaryByBookProps = {
   bookTitle: string;
   bookBkg: string;
   bookId: string;
   totalComments: number | null;
   userId: string | undefined;
};
const CommentariesByBook = ({
   bookTitle,
   bookBkg,
   bookId,
   totalComments,
   userId
}: commentaryByBookProps) => {
   return (
      <Link href={`/users/${userId}/commentaries/by-book/${bookId}`}>
         <a className={commentsByBookStyles.mainWrapper}>
            <div className={commentsByBookStyles.header}>
               <p>{bookTitle}</p>
            </div>
            <div className={commentsByBookStyles.bkg} style={{ backgroundImage: bookBkg }}></div>
            <div className={commentsByBookStyles.footer}>
               <p className='std-text-block--widget '>Comments: {totalComments}</p>
            </div>
         </a>
      </Link>
   );
};

export default CommentariesByBook;
