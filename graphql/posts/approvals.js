import { gql } from "@apollo/client";

export const CREATE_COMMENTARY_APPROVAL = gql`
   mutation ($USER_ID: ID, $COMMENTARY_ID: ID, $approval_rate: Int) {
      rate_commentary(
         data: { USER_ID: $USER_ID, COMMENTARY_ID: $COMMENTARY_ID, approval_rate: $approval_rate }
      ) {
         ID
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
      commentary_approvals(QUOTE_ID: $QUOTE_ID) {
         ID
         USER_ID
         QUOTE_ID
         posted_on
         total_count
         average_count
      }
   }
`;

export const GET_THOUGHT_APPROVALS = gql`
   query ($THOUGHT_ID: ID) {
      commentary_approvals(THOUGHT_ID: $THOUGHT_ID) {
         ID
         USER_ID
         THOUGHT_ID
         posted_on
         total_count
         average_count
      }
   }
`;
