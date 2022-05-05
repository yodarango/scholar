import { gql } from "@apollo/client";

export const GET_MY_NOTIFICATIONS = gql`
   query ($last_id: Int) {
      notifications(last_id: $last_id) {
         ID
         USER_ID
         POST_ID
         CONTENT_TYPE
         posted_on
         body
      }
   }
`;

export const NEW_NOTIFICATION = gql`
   mutation ($CONTENT_TYPE: Int, $body: String, $USER_ID: ID, $POST_ID: ID) {
      new_notification(
         data: { CONTENT_TYPE: $CONTENT_TYPE, body: $body, USER_ID: $USER_ID, POST_ID: $POST_ID }
      ) {
         ID
      }
   }
`;
