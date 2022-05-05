import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
   mutation ($signature: String, $password: String) {
      authenticate_user(signature: $signature, password: $password) {
         ... on NewSession {
            token
            ID
            signature
            authority_level
            patron
         }
         ... on IncorrecctCredentials {
            message
         }
      }
   }
`;

export const VERIFY_EMAIL_EXISTS = gql`
   mutation ($email: String) {
      verify_email_exists(email: $email)
   }
`;

export const VERIFY_FORGOTTEN_PASSWORD_CODE = gql`
   mutation ($verification_code: String) {
      forgotten_password_code(verification_code: $verification_code)
   }
`;

export const PASSWORD_RECOVERY_NEW = gql`
   mutation ($new_password: String, $USER_ID: Int) {
      recover_password(new_password: $new_password, USER_ID: $USER_ID)
   }
`;
