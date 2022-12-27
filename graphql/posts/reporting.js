import { gql } from "@apollo/client";

export const REPORT_COMMENTARY = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_commentary(data: { POST_ID: $POST_ID, USER_ID: $USER_ID })
   }
`;

export const REPORT_QUOTE = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_quote(data: { POST_ID: $POST_ID, USER_ID: $USER_ID })
   }
`;

export const REPORT_THOUGHT = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_thought(data: { POST_ID: $POST_ID, USER_ID: $USER_ID })
   }
`;

export const REPORT_SERMON_NOTE = gql`
   mutation ($POST_ID: ID, $USER_ID: ID) {
      report_sermon_note(data: { POST_ID: $POST_ID, USER_ID: $USER_ID })
   }
`;
