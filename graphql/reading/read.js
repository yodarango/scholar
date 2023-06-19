import { gql } from "@apollo/client";

// requests highlights by CHAPTER_ID
export const GET_HIGHILGHTED_VERSES = gql`
   query ($ID: ID, $VERSE_ID: String, $last_id: ID, $USER_ID: ID) {
      highlighted_verses(ID: $ID, VERSE_ID: $VERSE_ID, last_id: $last_id, USER_ID: $USER_ID) {
         ID
         VERSE_ID
         highlight_type
         color
      }
   }
`;

export const GET_CHAPTER_COMMENTARIES_REFS = gql`
   query ($ID: ID, $VERSE_ID: ID, $USER_ID: ID, $last_id: ID) {
      chapter_commentary_refs(ID: $ID, VERSE_ID: $VERSE_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         VERSE_ID
         sticker
      }
   }
`;

// creates new verse highlight by VERSE_ID
export const POST_HIGHILGHTED_VERSES = gql`
   mutation ($VERSE_ID: ID, $highlight_type: Int, $color: String) {
      new_highlighted_verse(
         data: { VERSE_ID: $VERSE_ID, highlight_type: $highlight_type, color: $color }
      ) {
         ... on Highlight {
            VERSE_ID
            highlight_type
            color
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

// Removes all highlighted verses by VERSE_ID to avoid redundancy
export const REMOVE_HIGHILGHTED_VERSE = gql`
   mutation ($VERSE_ID: ID) {
      remove_highlighted_verse(VERSE_ID: $VERSE_ID) {
         ... on Highlight {
            VERSE_ID
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

// requests bookmarks by CHAPTER_ID
export const GET_BOOKMARKS = gql`
   query ($ID: ID, $CHAPTER_ID: String, $USER_ID: ID, $last_id: ID) {
      bookmarks(ID: $ID, CHAPTER_ID: $CHAPTER_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         CHAPTER_ID
         USER_ID
      }
   }
`;

// creates a bookmark by CHAPTER_ID
export const POST_BOOKMARK = gql`
   mutation ($CHAPTER_ID: String) {
      new_bookmark(CHAPTER_ID: $CHAPTER_ID) {
         ... on Bookmark {
            ID
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

// removes a bookmark by CHAPTER_ID
export const REMOVE_BOOKMARK = gql`
   mutation ($CHAPTER_ID: String) {
      remove_bookmark(CHAPTER_ID: $CHAPTER_ID) {
         ... on Bookmark {
            ID
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;
