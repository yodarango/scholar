import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
   mutation ($signature: String, $email: String, $password: String, $gender: String) {
      create_new_user(
         data: { signature: $signature, email: $email, password: $password, gender: $gender }
      ) {
         ... on NewSession {
            token
            ID
            signature
            authority_level
            patron
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

export const VERIFY_ACCOUNT = gql`
   mutation ($verification_code: String) {
      verify_account(verification_code: $verification_code) {
         ... on NewSession {
            token
            ID
            signature
            avatar
         }
         ... on IncorrectVerificatoinCode {
            message
         }

         ... on ServerError {
            message
         }
      }
   }
`;
