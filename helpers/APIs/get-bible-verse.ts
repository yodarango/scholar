export const getInitialData = async (verse: string | string[] | undefined) => {
   if (verse) {
      const request = await fetch(
         `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${verse}?content-type=text&include-verse-numbers=false`,
         {
            method: "GET",
            headers: {
               "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
            }
         }
      );
      const response = await request.json();
      return response.data;
   }
   return {
      id: "JHN.1.8",
      orgId: "JHN.1.8",
      bookId: "JHN",
      chapterId: "JHN.1",
      bibleId: "de4e12af7f28f599-01",
      reference: "John 1:8",
      content: " He was not that Light, but was sent to bear witness of that Light. \n",
      verseCount: 1,
      copyright:
         "PUBLIC DOMAIN except in the United Kingdom, where a Crown Copyright applies to printing the KJV. See http://www.cambridge.org/about-us/who-we-are/queens-printers-patent",
      next: {
         id: "JHN.1.9",
         number: "9"
      },
      previous: {
         id: "JHN.1.7",
         number: "7"
      }
   };
};
