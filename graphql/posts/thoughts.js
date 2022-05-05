import { gql } from "@apollo/client";

export const GET_THOUGHTS = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String) {
      thought(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags) {
         ID
         body
         USER_ID
         category_tags
         posted_on
         referenced_verses
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

export const GET_ONE_THOUGHT = gql`
   query ($ID: ID, $showComment: Boolean) {
      thought(ID: $ID) {
         ID
         body
         USER_ID
         category_tags
         posted_on
         referenced_verses
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

export const GET_EDIT_THOUGHT = gql`
   query ($ID: ID) {
      thought(ID: $ID) {
         ID
         body
         USER_ID
         category_tags
         posted_on
         referenced_verses
         creator {
            ID
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

// ================== POSTING routes ===================
export const CREATE_NEW_THOUGHT = gql`
   mutation ($body: String, $category_tags: String, $referenced_verses: String, $title: String) {
      thought(
         data: {
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            title: $title
         }
      ) {
         ... on Thought {
            ID
            USER_ID
         }

         ... on ExceedsPostCount {
            message
         }
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

// ================== EDIT ================== //
export const EDIT_THOUGHT = gql`
   mutation ($body: String, $category_tags: String, $referenced_verses: String, $ID: ID) {
      edit_thought(
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

// ==================== DELETING ROUTES =================
export const DELETE_ONE_THOUGHT = gql`
   mutation ($ID: ID) {
      delete_one_thought(ID: $ID) {
         ID
      }
   }
`;
