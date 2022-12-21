import { gql } from "@apollo/client";

export const CONTENT_RATING = gql`
   mutation ($COMMENTARY_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_commentary(data: { COMMENTARY_ID: $COMMENTARY_ID, rating: $rating, USER_ID: $USER_ID }) {
         ID
   }
`;

export const CREATE_THOUGHT_APPROVAL = gql`
   mutation ($THOUGHT_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_thought(data: { THOUGHT_ID: $THOUGHT_ID, rating: $rating, USER_ID: $USER_ID }) {
         # ... on Quote_Approval {
         ID
         # }
         # ... on ExceedsPostCount {
         #    message
         # }
      }
   }
`;

export const CREATE_QUOTE_APPROVAL = gql`
   mutation ($QUOTE_ID: ID, $rating: Int, $USER_ID: ID) {
      rate_quote(data: { QUOTE_ID: $QUOTE_ID, rating: $rating, USER_ID: $USER_ID }) {
         # ... on Thought_Approval {
         ID
         # }
         # ... on ExceedsPostCount {
         #    message
         # }
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
