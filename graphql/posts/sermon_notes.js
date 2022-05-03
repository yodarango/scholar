import { gql } from "@apollo/client";

export const GET_SERMON_NOTES = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String) {
      sermon_notes(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags) {
         ID
         content
         title
         USER_ID
         category_tags
         creator {
            ID
            signature
            authority_level
            approval_rating
         }
      }
   }
`;

export const GET_ONE_SERMON_NOTE = gql`
   query ($ID: ID) {
      sermon_notes(ID: $ID) {
         ID
         content
         title
         USER_ID
         category_tags
         creator {
            ID
            signature
            authority_level
            approval_rating
         }
      }
   }
`;

export const WIGO_REQUEST_MORE_SERMON_NOTES = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String, $last_id: ID) {
      sermon_notes(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags, last_id: $last_id) {
         ID
         content
         USER_ID
         category_tags
         creator {
            ID
            signature
            authority_level
            approval_rating
         }
      }
   }
`;

export const CREATE_NEW_SERMON_NOTE = gql`
   mutation (
      $description: String
      $body: String
      $category_tags: String
      $title: String
      $file_url: String
      $approval_level: AuthorityLevel
      $DROPBOX_ID: ID
   ) {
      sermon_note(
         data: {
            description: $description
            body: $body
            category_tags: $category_tags
            title: $title
            file_url: $file_url
            approval_level: $approval_level
            DROPBOX_ID: $DROPBOX_ID
         }
      ) {
         ... on UserContent_SermonNotes {
            ID
            USER_ID
            body
         }

         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

// ================ REPORT ===================== //
export const REPORT_SERMON_NOTE = gql`
   mutation ($SERMON_NOTE_ID: ID) {
      report_sermon_note(data: { SERMON_NOTE_ID: $SERMON_NOTE_ID }) {
         ID
         USER_ID
      }
   }
`;

//================== EDIT ================== //
export const EDIT_SERMON_NOTE = gql`
   mutation ($title: String, $category_tags: String, $ID: ID) {
      edit_sermon_notes(data: { title: $title, category_tags: $category_tags, ID: $ID }) {
         ID
      }
   }
`;

//================== DELETE ================== //
export const DELETE_ONE_SEMRON_POST = gql`
   mutation ($ID: ID) {
      delete_one_sermon_note(ID: $ID) {
         ID
      }
   }
`;
