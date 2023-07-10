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

         ... on ServerError {
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

         ... on ServerError {
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

         ... on ServerError {
            message
         }
      }
   }
`;

export const GET_CHAPTER_SUMMARY = gql`
   query ($CHAPTER_ID: ID) {
      get_chapter_summary(CHAPTER_ID: $CHAPTER_ID) {
         ... on ChapterSummary {
            votes_up
            votes_down
            CHAPTER_ID
            summary
         }

         ... on NotAuthorized {
            message
         }

         ... on ServerError {
            message
         }
      }
   }
`;

export const GET_IMAGE_FROM_BIBLE_VERSE = gql`
   query ($VERSE_ID: ID) {
      get_Bible_verse_image(VERSE_ID: $VERSE_ID) {
         ... on VerseImage {
            ID
            VERSE_ID
            image_url
            verse_citation
         }

         ... on NotAuthorized {
            message
         }

         ... on ServerError {
            message
         }

         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

export const HANDLE_CHAPTER_SUMMARY_VOTE = gql`
   mutation ($CHAPTER_ID: ID, $vote: Int) {
      handle_chapter_summary_vote(CHAPTER_ID: $CHAPTER_ID, vote: $vote) {
         ... on ChapterSummary {
            votes_up
            votes_down
            CHAPTER_ID
            summary
         }
      }
   }
`;

export const KEEP_VERSE_TO_IMAGE = gql`
   mutation ($VERSE_ID: ID, $image: String) {
      keep_verse_to_image(VERSE_ID: $VERSE_ID, image: $image) {
         ... on VerseImage {
            ID
            VERSE_ID
            image_url
         }

         ... on NotAuthorized {
            message
         }

         ... on ServerError {
            message
         }

         ... on ExceedsPostCount {
            message
         }
      }
   }
`;
