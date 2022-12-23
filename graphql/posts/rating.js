import { gql } from "@apollo/client";

export const RATE_COMMENT = gql`
   mutation ($POST_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_commentary(data: { POST_ID: $POST_ID, rating: $rating, USER_ID: $USER_ID }) {
         status
      }
   }
`;

export const RATE_THOUGHT = gql`
   mutation ($POST_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_thought(data: { POST_ID: $POST_ID, rating: $rating, USER_ID: $USER_ID }) {
         status
      }
   }
`;

export const RATE_QUOTE = gql`
   mutation ($POST_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_quote(data: { POST_ID: $POST_ID, rating: $rating, USER_ID: $USER_ID }) {
         status
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

export const GET_THOUGHT_APPROVALS = gql`
   query ($THOUGHT_ID: ID) {
      thought_approvals(THOUGHT_ID: $THOUGHT_ID) {
         total_count
         average_count
      }
   }
`;
