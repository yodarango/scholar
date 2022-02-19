import { gql } from "@apollo/client";

// ====================== GET ROUTES ============================ //
export const GET_COMMENTARY_COMMENTS = gql`
   query ($COMMENTARY_ID: ID, $last_id: ID) {
      commentary_comments(COMMENTARY_ID: $COMMENTARY_ID, last_id: $last_id) {
         ID
         COMMENTARY_ID
         USER_ID
         posted_on
         body
         creator_signature
         creator_avatar
         creator_approval_rate
      }
   }
`;

export const GET_THOUGHT_COMMENTS = gql`
   query ($THOUGHT_ID: ID, $last_id: ID) {
      thought_comments(THOUGHT_ID: $THOUGHT_ID, last_id: $last_id) {
         ID
         THOUGHT_ID
         USER_ID
         posted_on
         body
         creator_signature
         creator_avatar
         creator_approval_rate
      }
   }
`;

// ====================== POST ROUTES =========================== //
export const CREATE_COMMENTARY_COMMENT = gql`
   mutation ($COMMENTARY_ID: ID, $body: String) {
      Commentary_Comment(data: { COMMENTARY_ID: $COMMENTARY_ID, body: $body }) {
         ID
      }
   }
`;

export const CREATE_QUOTE_COMMENT = gql`
   mutation ($QUOTE_ID: ID, $body: String) {
      Quote_Comment(data: { QUOTE_ID: $QUOTE_ID, body: $body }) {
         ID
      }
   }
`;

export const CREATE_THOUGHT_COMMENT = gql`
   mutation ($THOUGHT_ID: ID,  $body: String) {
      Thought_Comment(data: { THOUGHT_ID: $THOUGHT_ID, body: $body }) {
         ID
      }
   }
`;
