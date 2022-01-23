import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
   mutation ($signature: String, $email: String, $password: String) {
      create_new_user(data: { signature: $signature, email: $email, password: $password }) {
         ... on NewSession {
            token
            ID
            signature
            email
         }
         ... on SignatureAlreadyTaken {
            message
         }
         ... on EmailExists {
            message
         }
      }
   }
`;
