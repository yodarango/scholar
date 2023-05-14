import { DEFAULT_BIBLE_SETTINGS } from "../../constants/defaults";

// helpers
import { parseChapterId, findChapterIdFromRef } from "../data/parse_bible_id";

// process for getting LS items
// 1. If item is in the router that is used else :
// 2. If item is in Local Storage that is used: else :
// 3. fallback to DEFAULTS

export const getLSBibleSettings = (router: any) => {
   const LSExists = localStorage.getItem("reading-preferences");
   const LSParsed = LSExists && JSON.parse(LSExists);
   const chapterId = router.query["chapter-id"];

   let data;

   if (LSExists) {
      /****************************************************************************************
       * if there is a chapter ID in the router we want to give precedence to the router over their
       * local storage 💦
       *******************
       */
      if (router.query["chapter-id"]) {
         let scriptureRef = parseChapterId(chapterId);
         const updateScripture = { ...LSParsed, chapterId, scriptureRef };

         localStorage.setItem("reading-preferences", JSON.stringify(updateScripture));

         data = updateScripture;
      } else if (!LSParsed.chapterId && !router.query["chapter-id"]) {
         /*********************************************************************************
          * If we have a LS settings but no chapter ID in them that mean we need to add it,
          * Since we have an LS obj that means we have a chapter reference  there. Get the
          * chapterId from the LS by looking at the reference 🔥
          * ****************************************************
          */
         const chapterId = findChapterIdFromRef(LSParsed.scriptureRef);
         LSParsed.chapterId = chapterId;
         data = LSParsed;
      } else {
         data = LSParsed;
      }
   } else {
      const {
         FONT,
         LANG_ICON,
         LANGUAGE,
         THEME,
         CHAPTER_CITATION,
         VERSION_ID,
         VERSION_NAME,
         CHAPTER_ID
      } = DEFAULT_BIBLE_SETTINGS;

      const defaults = {
         font: FONT,
         langIcon: LANG_ICON,
         language: LANGUAGE,
         scriptureRef: chapterId ? parseChapterId(chapterId) : CHAPTER_CITATION,
         theme: THEME,
         versionId: VERSION_ID,
         versionName: VERSION_NAME,
         chapterId: chapterId ? chapterId : CHAPTER_ID
      };

      const stringifyDefaults = JSON.stringify(defaults);

      localStorage.setItem("reading-preferences", stringifyDefaults);

      data = defaults;
   }

   return data;
};
