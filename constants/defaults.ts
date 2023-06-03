import { english } from "../data/supported_bible_versions/english";

// posts
export const COM_DEFAULT_IMG_PLACEHOLDER = "/images/branding/logo_round_pow_small.png";
export const THO_DEFAULT_IMG_PLACEHOLDER = "/images/branding/logo_round_pow_small.png";
export const COMMENTARY_STICKER_DEFAULT = "/images/branding/logo_round_pow_small.png";

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
export const CONTENT_TYPE_FOLDER = 5;
export const CONTENT_TYPE_CONTENT_COMMENT = 6;

// bulk actions
export const BULK_ACTION_DELETE = "delete";
export const BULK_ACTION_PRIVATE = "private";
export const BULK_ACTION_PUBLIC = "public";

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

// quote backgrounds
export const QUOTE_BKG_1 = "quote-bkg--1";
export const QUOTE_BKG_2 = "quote-bkg--2";
export const QUOTE_BKG_3 = "quote-bkg--3";
export const QUOTE_BKG_4 = "quote-bkg--4";
export const QUOTE_BKG_5 = "quote-bkg--5";
export const QUOTE_BKG_6 = "quote-bkg--6";
export const QUOTE_BKG_7 = "quote-bkg--7";
export const QUOTE_BKG_8 = "quote-bkg--8";
export const QUOTE_BKG_9 = "quote-bkg--9";
export const QUOTE_BKG_10 = "quote-bkg--10";
export const QUOTE_BKG_11 = "quote-bkg--11";
export const QUOTE_BKG_12 = "quote-bkg--12";
export const QUOTE_BKG_13 = "quote-bkg--13";
export const QUOTE_BKG_14 = "quote-bkg--14";
export const QUOTE_BKG_15 = "quote-bkg--15";
export const QUOTE_BKG_16 = "quote-bkg--16";
export const QUOTE_BKG_17 = "quote-bkg--17";
export const QUOTE_BKG_18 = "quote-bkg--18";
export const QUOTE_BKG_19 = "quote-bkg--19";
export const QUOTE_BKG_20 = "quote-bkg--20";

export const LIGHT_QUOTE_BACKGROUNDS = [
   "quote-bkg--11",
   "quote-bkg--12",
   "quote-bkg--13",
   "quote-bkg--20",
   "quote-bkg--5"
];

export const LIGHT_COMMENT_BACKGROUNDS = ["GRN", "CYN", "YLW", "PNK"];

export const READING_THEME_BACKGROUNDS = {
   1: "/images/reading/blue.webp",
   2: "/images/reading/green.webp",
   3: "/images/reading/orange.webp",
   4: "/images/reading/pink.webp",
   5: "/images/reading/purple.webp"
};
