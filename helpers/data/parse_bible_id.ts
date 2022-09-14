import { Bible } from "../../data/bible";

export const parseVerseId: (id: string) => string = (id: string) => {
   const bookId = id.split(".")[0];
   const chapter = id.split(".")[1];
   const verse = id.split(".")[2];

   const book = Bible.filter((book) => book.bookId === bookId);
   return `${book[0].bookTitle} ${chapter}:${verse}`;
};

export const parseChapterId: (id: string) => string = (id: string) => {
   const bookId = id.split(".")[0];
   const chapter = id.split(".")[1];

   const book = Bible.filter((book) => book.bookId === bookId);
   return `${book[0].bookTitle} ${chapter}`;
};
