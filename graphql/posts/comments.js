import { gql } from "@apollo/client";

// ====================== GET ROUTES ============================ //
export const GET_COMMENTARY_COMMENTS = gql`
   query ($ID: ID, $POST_ID: ID, $USER_ID: ID, $last_id: ID) {
      commentary_comments(ID: $ID, POST_ID: $POST_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         COMMENTARY_ID
         posted_on
         body
         creator_signature
         creator_avatar
         creator_approval_rate
         creator_authority_level
         creator_id
      }
   }
`;

export const GET_THOUGHT_COMMENTS = gql`
   query ($ID: ID, $POST_ID: ID, $USER_ID: ID, $last_id: ID) {
      thought_comments(ID: $ID, POST_ID: $POST_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         THOUGHT_ID
         USER_ID
         posted_on
         body
         creator_signature
         creator_avatar
         creator_approval_rate
         creator_authority_level
         creator_id
      }
   }
`;

export const GET_QUOTE_COMMENTS = gql`
   query ($ID: ID, $POST_ID: ID, $USER_ID: ID, $last_id: ID) {
      quote_comments(ID: $ID, POST_ID: $POST_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         THOUGHT_ID
         USER_ID
         posted_on
         body
         creator_signature
         creator_avatar
         creator_approval_rate
         creator_authority_level
         creator_id
      }
   }
`;

// ====================== POST ROUTES =========================== //
export const CREATE_COMMENTARY_COMMENT = gql`
   mutation ($COMMENTARY_ID: ID, $body: String, $USER_ID: ID) {
      Commentary_Comment(data: { COMMENTARY_ID: $COMMENTARY_ID, body: $body, USER_ID: $USER_ID }) {
         ... on Commentary_Comment {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
         }
         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

export const CREATE_QUOTE_COMMENT = gql`
   mutation ($QUOTE_ID: ID, $body: String, $USER_ID: ID) {
      Quote_Comment(data: { QUOTE_ID: $QUOTE_ID, body: $body, USER_ID: $USER_ID }) {
         ... on Quote_Comment {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
         }
         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

export const CREATE_THOUGHT_COMMENT = gql`
   mutation ($THOUGHT_ID: ID, $body: String, $USER_ID: ID) {
      Thought_Comment(data: { THOUGHT_ID: $THOUGHT_ID, body: $body, USER_ID: $USER_ID }) {
         ... on Thought_Comment {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
         }

         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

// ====================== DELETE ROUTES =========================== //
export const DELETE_COMMENTARY_COMMENT = gql`
   mutation ($ID: ID) {
      delete_commentary_comment(ID: $ID)
   }
`;

export const DELETE_QUOTE_COMMENT = gql`
   mutation ($ID: ID) {
      delete_quote_comment(ID: $ID)
   }
`;

export const DELETE_THOUGHT_COMMENT = gql`
   mutation ($ID: ID) {
      delete_thought_comment(ID: $ID)
   }
`;
