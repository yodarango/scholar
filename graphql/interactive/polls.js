import { gql } from "@apollo/client";

export const GET_ALL_POLLS = gql`
   query {
      all_polls {
         ID
         type
         dilemma
         options
         countdown
         votes {
            ID
            POLL_ID
            vote
         }
      }
   }
`;
