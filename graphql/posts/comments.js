import { gql } from "@apollo/client";

// get routes
export const GET_COMMENTARY_COMMENTS = gql`
   query ($ID: ID, $COMMENTARY_ID: ID, $USER_ID: ID, $last_id: ID) {
      commentary_comments(
         ID: $ID
         COMMENTARY_ID: $COMMENTARY_ID
         USER_ID: $USER_ID
         last_id: $last_id
      ) {
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

export const GET_ARTICLE_COMMENTS = gql`
   query ($ID: ID, $ARTICLE_ID: ID, $USER_ID: ID, $last_id: ID) {
      article_comments(ID: $ID, ARTICLE_ID: $ARTICLE_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         ARTICLE_ID
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
   query ($ID: ID, $QUOTE_ID: ID, $USER_ID: ID, $last_id: ID) {
      quote_comments(ID: $ID, QUOTE_ID: $QUOTE_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         QUOTE_ID
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

//  POST ROUTES
export const CREATE_COMMENTARY_COMMENT = gql`
   mutation ($ID: ID, $POST_ID: ID, $body: String, $USER_ID: ID) {
      commentary_comment(data: { ID: $ID, body: $body, USER_ID: $USER_ID, POST_ID: $POST_ID }) {
         ... on Commentary_Comment {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
            posted_on
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

export const CREATE_QUOTE_COMMENT = gql`
   mutation ($ID: ID, $POST_ID: ID, $body: String, $USER_ID: ID) {
      quote_comment(data: { ID: $ID, POST_ID: $POST_ID, body: $body, USER_ID: $USER_ID }) {
         ... on Quote_Comment {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
            posted_on
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

export const CREATE_ARTICLE_COMMENT = gql`
   mutation ($ID: ID, $POST_ID: ID, $body: String, $USER_ID: ID) {
      article_comment(data: { ID: $ID, POST_ID: $POST_ID, body: $body, USER_ID: $USER_ID }) {
         ... on Article_Comment {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            creator_authority_level
            creator_id
            posted_on
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

//  DELETE ROUTES
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

export const DELETE_ARTICLE_COMMENT = gql`
   mutation ($ID: ID) {
      delete_article_comment(ID: $ID)
   }
`;
