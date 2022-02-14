import { gql } from "@apollo/client";

export const CREATE_COMMENTARY_APPROVAL = gql`
   mutation ( $COMMENTARY_ID: ID, $approval_rate: Int) {
      rate_commentary(
         data: { COMMENTARY_ID: $COMMENTARY_ID, approval_rate: $approval_rate }
      ) {
         ID
      }
   }
`;

export const CREATE_THOUGHT_APPROVAL = gql`
   mutation ( $THOUGHT_ID: ID, $approval_rate: Int) {
      rate_thought(
         data: { THOUGHT_ID: $THOUGHT_ID, approval_rate: $approval_rate }
      ) {
         ID
      }
   }
`;

export const CREATE_QUOTE_APPROVAL = gql`
   mutation ( $QUOTE_ID: ID, $approval_rate: Int) {
      rate_quote(data: {  QUOTE_ID: $QUOTE_ID, approval_rate: $approval_rate }) {
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
