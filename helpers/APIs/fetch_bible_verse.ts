// hepers
import { chosenKey } from "./select-random-api-key";

export const fetchBibleVerse = async (
   verse: string | string[] | undefined,
   versionId: string = "de4e12af7f28f599-02"
) => {
   if (verse) {
      // API params: ?content-type=html&include-verse-numbers=true&include-titles=true
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
         if (response.data) {
            return response.data;
         }
         return null;
      } catch (error) {
         console.log(error);
         return null;
      }
   }
};
