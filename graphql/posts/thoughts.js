import { gql } from "@apollo/client";

export const GET_THOUGHTS = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String, $body: String, $last_id: ID) {
      thought(
         ID: $ID
         USER_ID: $USER_ID
         category_tags: $category_tags
         body: $body
         last_id: $last_id
      ) {
         ID
         body
         title
         USER_ID
         category_tags
         posted_on
         created_date
         referenced_verses
         post_image
         signature
         approval_rating
         authority_level
         avatar
         total_comment_count
         average_rating_count
         total_rating_count
      }
   }
`;

export const GET_THOUGHT_IN_24 = gql`
   query {
      thought_in_24 {
         ID
         body
         USER_ID
         category_tags
         posted_on
         post_image
         referenced_verses
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
         # creator {
         ID
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

// POST ROUTES
export const CREATE_NEW_THOUGHT = gql`
   mutation (
      $body: String
      $category_tags: String
      $referenced_verses: String
      $title: String
      $post_image: String
   ) {
      thought(
         data: {
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            title: $title
            post_image: $post_image
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

//
export const EDIT_THOUGHT = gql`
   mutation (
      $body: String
      $category_tags: String
      $referenced_verses: String
      $title: String
      $post_image: String
      $ID: ID
   ) {
      edit_thought(
         data: {
            ID: $ID
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            title: $title
            post_image: $post_image
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
