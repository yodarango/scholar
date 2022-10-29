import { gql } from "@apollo/client";

export const GET_POLL_MULTIPLE_OPTIONS = gql`
   query {
      poll_multiple_choice_in_24 {
         ID
         type
         dilemma
         countdown
         options
         votes {
            ID
            POLL_ID
            vote
         }
      }
   }
`;
