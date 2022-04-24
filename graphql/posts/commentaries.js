import { gql } from "@apollo/client";

//================== GET ================== //
export const GET_COMMENTARIES = gql`
   query ($ID: ID, $USER_ID: ID, $VERSE_ID: String, $category_tags: String) {
      commentary(ID: $ID, USER_ID: $USER_ID, VERSE_ID: $VERSE_ID, category_tags: $category_tags) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
            first_name
            last_name
         }
         comments {
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const WIGO_REQUEST_MORE_COMMENTARIES = gql`
   query ($last_id: ID) {
      # commentaries
      commentary(last_id: $last_id) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments {
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const SHOW_COMMENTS_OF_COMMENTARY = gql`
   query ($ID: ID, $showComment: Boolean) {
      commentary(ID: $ID) {
         comments(showComment: $showComment) {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
            posted_on
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const GET_ONE_COMMENTARY = gql`
   query ($ID: ID, $showComment: Boolean) {
      commentary(ID: $ID) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments(showComment: $showComment) {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            posted_on
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;
//================== POST ================== //
export const CREATE_NEW_COMMENTARY = gql`
   mutation (
      $VERSE_ID: String
      $body: String
      $category_tags: String
      $referenced_verses: String
      $verse_citation: String
      $approval_level: AuthorityLevel
   ) {
      commentary(
         data: {
            VERSE_ID: $VERSE_ID
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            verse_citation: $verse_citation
            approval_level: $approval_level
         }
      ) {
         ... on Commentary {
            ID
            VERSE_ID
            USER_ID
         }
         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

export const REPORT_COMMENTARY = gql`
   mutation ($COMMENTARY_ID: ID, $USER_ID: ID) {
      report_commentary(data: { COMMENTARY_ID: $COMMENTARY_ID, USER_ID: $USER_ID }) {
         ID
         COMMENTARY_ID
         USER_ID
      }
   }
`;

//================== EDIT ================== //
export const EDIT_COMMENTARY = gql`
   mutation ($body: String, $category_tags: String, $referenced_verses: String, $ID: ID) {
      edit_commentary(
         data: {
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            ID: $ID
         }
      ) {
         ID
      }
   }
`;

//================== DELETE ================== //
export const DELETE_ONE_COMMENTARY = gql`
   mutation ($ID: ID) {
      delete_one_commentary(ID: $ID) {
         ID
      }
   }
`;
