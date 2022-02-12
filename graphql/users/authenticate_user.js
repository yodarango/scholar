import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
   mutation ($signature: String, $password: String) {
      authenticate_user(signature: $signature, password: $password) {
         ... on NewSession {
            token
            ID
            signature
         }
         ... on IncorrecctCredentials {
            message
         }
      }
   }
`;
