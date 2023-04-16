// hepers
import { chosenKey } from "./select-random-api-key";

export const fetchBibleChapter = async (
   chapter: string | string[] | undefined,
   versionId: string = "de4e12af7f28f599-02"
) => {
   if (chapter) {
      // content-types: text, html, json
      try {
         const request = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapter}?content-type=text&include-notes=true&include-chapter-numbers=true&include-verse-spans=false&include-titles=true`,
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
};
