import { gql } from "@apollo/client";

export const REPORT_COMMENTARY = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_commentary(data: { POST_ID: $POST_ID, USER_ID: $USER_ID }) {
         ... on Commentary_Report {
            ID
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

export const REPORT_QUOTE = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_quote(data: { POST_ID: $POST_ID, USER_ID: $USER_ID }) {
         ... on Quote_Report {
            ID
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

export const REPORT_ARTICLE = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_thought(data: { POST_ID: $POST_ID, USER_ID: $USER_ID }) {
         ... on Article_Report {
            ID
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

export const REPORT_SERMON_NOTE = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_sermon_note(data: { POST_ID: $POST_ID, USER_ID: $USER_ID })
   }
`;
