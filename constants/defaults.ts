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

// content type
export const POST_TYPE_COMMENTARY = 1;
export const POST_TYPE_QUOTE = 2;
export const POST_TYPE_THOUGHT = 3;
export const POST_TYPE_SERMON_NOTE = 4;

// images
export const DEFAULT_THOUGHT_IMAGE = "/images/thoughts/default.png";
export const DEFAULT_COMMENTARY_IMAGE = "/images/commentary/default.png";
export const DEFAULT_QUOTE_BACKGROUND = "#quote-bkg--0";

// amount of records per query to return from db calls
export const COMMENTARIES_PER_QUERY = 20;
export const QUOTES_PER_QUERY = 20;
export const THOUGHTS_PER_QUERY = 20;
export const SERMON_NOTES_PER_QUERY = 20;
export const POST_COMMENTS_PER_QUERY = 20;
export const CONTENT_PER_QUERY_24 = 10;
export const FAST_FACTS_PER_QUERY = 6;
