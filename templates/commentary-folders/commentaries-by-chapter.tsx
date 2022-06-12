// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import CommentaryByChapter from "../../fragments/chunks/commentary-profile/commentaries-by-chapter";

// styles
import commentaryByBookTempStyle from "../../styles/templates/commentaries-by-book/CommentariesByChapter.module.css";

// data
import { bible, Tbible } from "../../data/bible-books-w-chapters";

const CommentariesByChapterTemp = () => {
   const router = useRouter();
   const currBook = router.query.book;
   const [chapters, setChapters] = useState<Tbible>({
      bookId: "",
      bookBkg: "",
      bookTitle: "",
      chapters: 0
   });

   useEffect(() => {
      if (router.isReady) {
         const getBookChapters: Tbible[] = bible.filter((book) => book.bookId === `${currBook}`);
         setChapters(getBookChapters[0]);
      }
   }, [router.isReady]);

   return (
      <div className={commentaryByBookTempStyle.chaptersWrapper}>
         {[...Array(chapters.chapters)].map((_, index: number) => (
            <CommentaryByChapter
               chapter={index + 1}
               chapterId={`${chapters.bookId}.${index}`}
               key={index}
            />
         ))}
      </div>
   );
};

export default CommentariesByChapterTemp;
