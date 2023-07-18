import {
   CONTENT_TYPE_FOLDER,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_SERMON_NOTE,
   POST_TYPE_ARTICLE,
   CONTENT_TYPE_CONTENT_COMMENT
} from "../constants/defaults";

export enum EnumContentType {
   commentary = POST_TYPE_COMMENTARY,
   quote = POST_TYPE_QUOTE,
   thought = POST_TYPE_ARTICLE,
   sermonNote = POST_TYPE_SERMON_NOTE,
   folder = CONTENT_TYPE_FOLDER,
   contentComment = CONTENT_TYPE_CONTENT_COMMENT
}

export enum EPollType {
   THUMBS_UP = 1,
   MULTIPLE_OPTIONS = 2
}
