import { gql } from "@apollo/client";

// gets a list of quote if no ID is passed or one quote WHERE ID = ID if it is passed.
export const GET_QUOTE = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String, $body: String, $last_id: ID) {
      quote(
         ID: $ID
         USER_ID: $USER_ID
         category_tags: $category_tags
         body: $body
         last_id: $last_id
      ) {
         ID
         body
         category_tags
         author
         background
         posted_on
         created_date
         # creator {
         USER_ID
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

// gets the last 20 quotes posted for the main page
export const GET_QUOTE_IN_24 = gql`
   query {
      quote_in_24 {
         ID
         body
         category_tags
         author
         background
         created_date
         posted_on
         # creator {
         USER_ID
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

export const GET_EDIT_QUOTE = gql`
   query ($ID: ID) {
      edit_quote(ID: $ID) {
         ID
         body
         category_tags
         author
         background
         created_date
         posted_on
         USER_ID
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

//  POST
export const CREATE_NEW_QUOTE = gql`
   mutation ($body: String, $category_tags: String, $author: String, $background: String) {
      quote(
         data: {
            body: $body
            category_tags: $category_tags
            author: $author
            background: $background
         }
      ) {
         ... on Quote {
            ID
            USER_ID
            body
         }

         ... on ExceedsPostCount {
            message
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

// EDIT
export const EDIT_QUOTE = gql`
   mutation ($body: String, $category_tags: String, $author: String, $ID: ID, $background: String) {
      edit_quote(
         data: {
            body: $body
            category_tags: $category_tags
            author: $author
            ID: $ID
            background: $background
         }
      ) {
         ID
      }
   }
`;

// DELETE ROUTES
export const DELETE_ONE_QUOTE = gql`
   mutation ($ID: ID) {
      delete_one_quote(ID: $ID) {
         ... on Quote {
            ID
         }
         ... on NotAuthorized {
            message
         }
      }
   }
`;
