import { MM_DD_YYYY } from "../Time/dateFormats";
import { fetchBibleVerseWDefault } from "./fetch_bible_verse_with_default";
import { getRandomVerseId } from "./random-daily-verses";

export const setDailyVerseCache = async (versionId: string = "de4e12af7f28f599-02") => {
   const getCache: string | null = localStorage.getItem("todays-verse");

   if (!getCache) {
      const randomVerse = await fetchBibleVerseWDefault(getRandomVerseId(), versionId);

      const data = {
         data: randomVerse,
         lastCall: MM_DD_YYYY()
      };

      // update the local storage
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem("todays-verse", stringifiedData);

      return data;
   } else {
      const JsonData = JSON.parse(getCache);

      if (JsonData.lastCall !== MM_DD_YYYY() || !JsonData.data) {
         const randomVerse = await fetchBibleVerseWDefault(getRandomVerseId(), versionId);

         const data = {
            data: randomVerse,
            lastCall: MM_DD_YYYY()
         };

         // update the local storage
         const stringifiedData = JSON.stringify(data);
         localStorage.setItem("todays-verse", stringifiedData);

         return data;
      }
   }

   return JSON.parse(getCache);
};
