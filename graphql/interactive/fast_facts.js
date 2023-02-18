import { gql } from "@apollo/client";

export const GET_FAST_FACTS_IN_24 = gql`
   query {
      fast_facts_in_24 {
         ID
         type
         images
      }
   }
`;

export const GET_ALL_FAST_FACTS = gql`
   query ($last_id: ID) {
      fast_facts(last_id: $last_id) {
         ID
         posted_on
         images
      }
   }
`;
