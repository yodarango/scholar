import { gql } from "@apollo/client";

export const GET_POLL_THUMBS_UP = gql`
   query {
      poll_thumbs_up_in_24 {
         ID
         type
         dilemma
         countdown
         votes {
            ID
            POLL_ID
            vote
         }
      }
   }
`;
