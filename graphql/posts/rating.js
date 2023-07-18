import { gql } from "@apollo/client";

export const RATE_COMMENT = gql`
   mutation ($POST_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_commentary(data: { POST_ID: $POST_ID, rating: $rating, USER_ID: $USER_ID }) {
         ... on Commentary_Rating {
            status
         }

         ... on NotAuthorized {
            message
         }

         ... on ExceedsPostCount {
            message
         }

         ... on ServerError {
            message
         }
      }
   }
`;

export const RATE_ARTICLE = gql`
   mutation ($POST_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_thought(data: { POST_ID: $POST_ID, rating: $rating, USER_ID: $USER_ID }) {
         ... on Article_Approval {
            status
         }
         ... on NotAuthorized {
            message
         }

         ... on ExceedsPostCount {
            message
         }
         ... on ServerError {
            message
         }
      }
   }
`;

export const RATE_QUOTE = gql`
   mutation ($POST_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_quote(data: { POST_ID: $POST_ID, rating: $rating, USER_ID: $USER_ID }) {
         ... on Quote_Approval {
            status
         }

         ... on NotAuthorized {
            message
         }

         ... on ExceedsPostCount {
            message
         }
         ... on ServerError {
            message
         }
      }
   }
`;

export const GET_COMMENTARY_APPROVALS = gql`
   query ($COMMENTARY_ID: ID) {
      commentary_approvals(COMMENTARY_ID: $COMMENTARY_ID) {
         total_count
         average_count
      }
   }
`;

export const GET_QUOTE_APPROVALS = gql`
   query ($QUOTE_ID: ID) {
      quote_approvals(QUOTE_ID: $QUOTE_ID) {
         total_count
         average_count
      }
   }
`;

export const GET_ARTICLE_APPROVALS = gql`
   query ($ARTICLE_ID: ID) {
      thought_approvals(ARTICLE_ID: $ARTICLE_ID) {
         total_count
         average_count
      }
   }
`;
