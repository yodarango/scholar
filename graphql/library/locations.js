import { gql } from "@apollo/client";
export const GET_LOCATIONS = gql`
   query ($skip: String, $id: ID, $area: String) {
      congregations(skip: $skip, id: $id, area: $area) {
         id
         address
         city
         state
         fullState
         zip
         country
         location
         logo
         name
         organization
         schedule
         website
         iFrame
      }
   }
`;
