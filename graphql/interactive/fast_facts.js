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
