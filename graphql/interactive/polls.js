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

export const CREATE_POLL_VOTE = gql`
   mutation ($POLL_ID: ID, $type: Int, $vote: String) {
      poll_vote(data: { POLL_ID: $POLL_ID, type: $type, vote: $vote })
   }
`;
