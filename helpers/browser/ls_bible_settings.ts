import { DEFAULT_BIBLE_SETTINGS, DEFAULT_THEME } from "../../constants/defaults";

// process for getting LS items
// 1. If item is in the router that is used else :
// 2. If item is in Local Storage that is used: else :
// 3. fallback to DEFAULTS

export const getLSBibleSettings = (router: any) => {
   console.log(window.localStorage);
   let preferences = {};
   const LSExists = localStorage.getItem("reading-preferences");
   const LSParsed = LSExists && JSON.parse(LSExists);

   if (LSExists) {
      const chapterId = LSParsed.chapterId;
      const versionId = LSParsed.versionId;
      const versionName = LSParsed.versionName;
      const scriptureRef = LSParsed.scriptureRef;
      const theme = LSParsed.theme;
      const langIcon = LSParsed.langIcon;
      const language = LSParsed.language;

      if (router.query["chapter-id"]) {
         const chaptId = router.query["chapter-id"];
         preferences = { ...preferences, chaptId };
      } else if (chapterId) {
         preferences = { ...preferences, chapterId };
      } else {
         preferences = { ...preferences, chapterId: DEFAULT_BIBLE_SETTINGS.CHAPTER_ID };
      }

      // version ID
      if (versionId) {
         preferences = { ...preferences, versionId };
      } else {
         preferences = { ...preferences, versionId: DEFAULT_BIBLE_SETTINGS.VERSION_ID };
      }

      // version name
      if (versionName) {
         preferences = { ...preferences, versionName };
      } else {
         preferences = { ...preferences, versionName: DEFAULT_BIBLE_SETTINGS.VERSION_NAME };
      }

      // scripture reference
      if (scriptureRef) {
         preferences = { ...preferences, scriptureRef };
      } else {
         preferences = {
            ...preferences,
            scriptureRef: DEFAULT_BIBLE_SETTINGS.CHAPTER_CITATION
         };
      }

      // theme
      if (theme) {
         preferences = { ...preferences, theme };
      } else {
         preferences = { ...preferences, theme: DEFAULT_THEME };
      }

      // language icon
      if (langIcon) {
         preferences = { ...preferences, langIcon };
      } else {
         preferences = { ...preferences, langIcon: DEFAULT_BIBLE_SETTINGS.LANG_ICON };
      }

      // language
      if (language) {
         preferences = { ...preferences, language };
      } else {
         preferences = { ...preferences, langIcon: DEFAULT_BIBLE_SETTINGS.LANGUAGE };
      }

      return { ...LSParsed, ...preferences };
   }
};
