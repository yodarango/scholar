import { Bible } from "../../data/bible";

export const parseVerseId: (id: string) => string = (id: string) => {
   const bookId = id?.split(".")[0];
   const chapter = id?.split(".")[1];
   const verse = id?.split(".")[2];

   const book = Bible.filter((book) => book.bookId === bookId);
   return `${book[0].bookTitle} ${chapter}:${verse}`;
};

// makes a readable string from a chapter id
export const parseChapterId: (id: string) => string = (id: string) => {
   const bookId = id?.split(".")[0];
   const chapter = id?.split(".")[1];

   const book = Bible.filter((book) => book.bookId === bookId);
   return `${book[0].bookTitle} ${chapter}`;
};

export const findChapterIdFromRef: (ref: string) => string = (ref: string) => {
   const book = ref?.split(" ")[0];
   const chapter = ref?.split(" ")[1];

   const bookId = Bible.filter((b) => b.bookTitle === book);

   return `${bookId[0]?.bookId}.${chapter}`;
};
