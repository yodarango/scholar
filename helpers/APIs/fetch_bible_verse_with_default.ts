// hepers
import { chosenKey } from "./select-random-api-key";

export const fetchBibleVerseWDefault = async (
   verse: string | string[] | undefined,
   versionId: string = "de4e12af7f28f599-02"
) => {
   if (verse) {
      try {
         const request = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${verse}?content-type=text&include-verse-numbers=false`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const response = await request.json();
         return response.data;
      } catch (error) {
         console.error(error);
         return undefined;
      }
   }

   return {
      id: "1PE.1.8",
      orgId: "1PE.1.8",
      bookId: "1PE",
      chapterId: "1PE.1",
      bibleId: "de4e12af7f28f599-01",
      reference: "1 Peter 1:8",
      content:
         "Whom having not seen, ye love; in whom, though now ye see him not, yet believing, ye rejoice with joy unspeakable and full of glory: \n",
      verseCount: 1,
      copyright:
         "PUBLIC DOMAIN except in the United Kingdom, where a Crown Copyright applies to printing the KJV. See http://www.cambridge.org/about-us/who-we-are/queens-printers-patent",
      next: {
         id: "1PE.1.7",
         number: "7"
      },
      previous: {
         id: "1PE.1.9",
         number: "9"
      }
   };
};
