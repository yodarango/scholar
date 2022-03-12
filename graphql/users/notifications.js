import { gql } from "@apollo/client";

export const GET_MY_NOTIFICATIONS = gql`
   query {
      notifications {
         ID
         USER_ID
         POST_ID
         CONTENT_TYPE
         body
      }
   }
`;
