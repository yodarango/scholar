import { english } from "../data/supported_bible_versions/english";

// posts
export const COM_DEFAULT_IMG_PLACEHOLDER = "/default.png";
export const THO_DEFAULT_IMG_PLACEHOLDER = "/default.png";

// BIBLE READING
export const DEFAULT_BIBLE_SETTINGS = {
   FONT: "default",
   VERSION_ID: english[0].id,
   VERSION_NAME: english[0].abbreviation,
   VERSE_ID: "GEN.1.1",
   VERSE_CITATION: "Genesis 1:1",
   CHAPTER_ID: "GEN.1",
   CHAPTER_CITATION: "Genesis 1",
   LANG_ICON: "🇺🇸",
   LANGUAGE: "english",
   THEME: "3"
};

export const CONTENT_LAST_ID = 999999999;
export const NOTIFICATIONS_LAST_ID = 999999999;
export const CONTENT_COMMENTS_LAST_ID = 999999999;

// REQ/ RES
export const QUERY_WAS_INSERT = 0;
export const QUERY_WAS_UPDATE = 1;
