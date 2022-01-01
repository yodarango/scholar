import { gql } from "@apollo/client";

export const GET_THOUGHTS = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String) {
      thought(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags) {
         ID
         body
         USER_ID
         category_tags
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments {
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

export const WIGO_REQUEST_MORE_THOUGHTS = gql`
   query ($last_id: ID) {
      # thought
      thought(last_id: $last_id) {
         ID
         title
         body
         USER_ID
         category_tags
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

export const SHOW_COMMENTS_OF_THOUGHTS = gql`
   query ($ID: ID, $showComment: Boolean) {
      thought(ID: $ID) {
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

// ================== POSTING routes ===================
export const CREATE_NEW_THOUGHT = gql`
   mutation (
      $USER_ID: ID
      $body: String
      $category_tags: String
      $referenced_verses: String
      $title: String
      $approval_level: AuthorityLevel
   ) {
      thought(
         data: {
            USER_ID: $USER_ID
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            title: $title
            approval_level: $approval_level
         }
      ) {
         ID
         USER_ID
      }
   }
`;

export const DELETE_ONE_THOUGHT = gql`
   mutation ($ID: ID) {
      delete_one_thought(ID: $ID) {
         ID
      }
   }
`;

export const REPORT_THOUGHT = gql`
   mutation ($THOUGHT_ID: ID, $USER_ID: ID) {
      report_thought(data: { THOUGHT_ID: $THOUGHT_ID, USER_ID: $USER_ID }) {
         ID
         THOUGHT_ID
         USER_ID
      }
   }
`;
