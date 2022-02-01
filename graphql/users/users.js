import { gql } from "@apollo/client";

export const GET_USER_STORY = gql`
   query ($ID: ID) {
      users(ID: $ID) {
         ID
         signature
         avatar
         my_story
      }
   }
`;
