import { gql } from "@apollo/client";

// get all commentaries by filter. Only one will be fetch if ID is passed
export const GET_COMMENTARIES = gql`
   query (
      $ID: ID
      $USER_ID: ID
      $VERSE_ID: String
      $AUTHORITY_LEVEL: Int
      $body: String
      $category_tags: String
      $last_id: ID
   ) {
      commentary(
         ID: $ID
         USER_ID: $USER_ID
         VERSE_ID: $VERSE_ID
         AUTHORITY_LEVEL: $AUTHORITY_LEVEL
         body: $body
         category_tags: $category_tags
         last_id: $last_id
      ) {
         ID
         VERSE_ID
         USER_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         post_image
         is_private
         # creator {
         signature
         approval_rating
         authority_level
         avatar
         # }
         # comments {
         total_comment_count
         # }
         # approvals {
         average_rating_count
         total_rating_count
         # }
      }
   }
`;

// the commentaries in the last 24hrs for teh wigo page
export const GET_COMMENTARIES_IN_24 = gql`
   query {
      commentary_in_24 {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         post_image
         posted_on
         is_private
         # creator {
         signature
         approval_rating
         authority_level
         avatar
         # first_name
         # last_name
         # }
         # comments {
         total_comment_count
         # }
         # approvals {
         average_rating_count
         total_rating_count
         # }
      }
   }
`;

export const GET_COMMENTARIES_BY_BOOK = gql`
   query ($ID: ID, $USER_ID: ID, $VERSE_ID: String, $last_id: ID) {
      users(ID: $ID) {
         ID
         signature
         approval_rating
         authority_level
         my_church
         avatar
         first_name
         last_name
      }
      commentary(USER_ID: $USER_ID, VERSE_ID: $VERSE_ID, last_id: $last_id) {
         ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         is_private
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

export const GET_EDIT_COMMENTARY = gql`
   query ($ID: ID) {
      commentary(ID: $ID) {
         ID
         VERSE_ID
         USER_ID #needed to fetch child graphQL "parent.creator"
         body
         category_tags
         referenced_verses
         verse_citation
         posted_on
         is_private
         creator {
            ID
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
      $is_private: Boolean
      $post_image: String
   ) {
      commentary(
         data: {
            VERSE_ID: $VERSE_ID
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            verse_citation: $verse_citation
            is_private: $is_private
            post_image: $post_image
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

//================== EDIT ================== //
export const EDIT_COMMENTARY = gql`
   mutation (
      $body: String
      $category_tags: String
      $referenced_verses: String
      $ID: ID
      $is_private: Boolean
   ) {
      edit_commentary(
         data: {
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            is_private: $is_private
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
