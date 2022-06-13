// core
import { useState, useEffect } from "react";

// comps
import CommentaryByChapter from "../../../../../fragments/chunks/commentary-profile/commentaries-by-chapter";

// styles
import commentaryByBookTempStyle from "../../styles/templates/commentaries-by-book/CommentariesByChapter.module.css";

// data
import { bible, Tbible } from "../../../../../data/bible-books-w-chapters";

type commentariesByChapterTempProps = {
   bookId: string;
   userId: string | undefined | string[];
};
const CommentariesByChapterTemp = ({ bookId, userId }: commentariesByChapterTempProps) => {
   const [chapters, setChapters] = useState<Tbible>({
      bookId: "",
      bookBkg: "",
      bookTitle: "",
      chapters: 0
   });

   useEffect(() => {
      const getBookChapters: Tbible[] = bible.filter((book: Tbible) => book.bookId === `${bookId}`);
      setChapters(getBookChapters[0]);
   }, []);

   return (
      <div>
         <h1 className={commentaryByBookTempStyle.title}>Select Chapter</h1>
         {userId && (
            <div className={commentaryByBookTempStyle.chaptersWrapper}>
               {[...Array(chapters.chapters)].map((_, index: number) => (
                  <CommentaryByChapter
                     userId={userId}
                     chapter={index + 1}
                     chapterId={`${chapters.bookId}.${index}`}
                     key={index}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default CommentariesByChapterTemp;
