import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
   mutation (
      $authority_level: AuthorityLevel
      $signature: String
      $email: String
      $password: String
      $gender: String
   ) {
      create_new_user(
         data: {
            signature: $signature
            email: $email
            password: $password
            authority_level: $authority_level
            gender: $gender
         }
      ) {
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
