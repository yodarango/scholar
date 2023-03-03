import { gql } from "@apollo/client";

export const GET_HIGHILGHTED_VERSES = gql`
   query ($ID: ID, $VERSE_ID: String, $last_id: ID) {
      highlighted_verses(ID: $ID, VERSE_ID: $VERSE_ID, last_id: $last_id) {
         ID
         VERSE_ID
         highlight_type
         color
      }
   }
`;

export const POST_HIGHILGHTED_VERSES = gql`
   mutation ($VERSE_ID: ID, $highlight_type: Int, $color: String) {
      new_highlighted_verse(
         data: { VERSE_ID: $VERSE_ID, highlight_type: $highlight_type, color: $color }
      ) {
         VERSE_ID
         highlight_type
         color
      }
   }
`;

export const GET_BOOKMARKS = gql`
   query ($ID: ID, $CHAPTER_ID: String, $USER_ID: ID, $last_id: ID) {
      bookmarks(ID: $ID, CHAPTER_ID: $CHAPTER_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         CHAPTER_ID
         USER_ID
      }
   }
`;
