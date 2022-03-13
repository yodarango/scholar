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
