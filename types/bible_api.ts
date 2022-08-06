export type TBibleVerse = {
   bibleId: string;
   bookId: string;
   chapterId: string;
   content: string;
   copyright: string;
   id: string;
   next: { id: string; number: string };
   orgId: string;
   previous: { id: string; number: string };
   reference: string;
   verseCount: number;
};
