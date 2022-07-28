// hepers
import { chosenKey } from "./select-random-api-key";

export const fetchBibleChapter = async (
   chapter: string | string[] | undefined,
   versionId: string = "de4e12af7f28f599-02"
) => {
   if (chapter) {
    // API params: ?content-type=text&include-verse-numbers=false
      try {
         const request = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapter}`,
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
         console.log(error);
         return undefined;
      }
   }
};
