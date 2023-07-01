import { gql } from "@apollo/client";

export const GET_USER_STORY = gql`
   query ($ID: ID) {
      users(ID: $ID) {
         ID
         signature
         avatar
         my_story
      }
   }
`;

export const GET_CURRENT_USER = gql`
   query {
      get_current_user {
         is_patron
         signature
         email
         ID
      }
   }
`;

export const CHECK_IF_USER_PATRON = gql`
   query {
      is_user_patron {
         is_patron
      }
   }
`;

export const CHECK_AUTH = gql`
   query {
      is_user_logged_in
   }
`;

export const IS_FIRST_TIME_SIGN_UP = gql`
   query {
      is_first_time_sign_up
   }
`;

export const ACCEPT_TERMS = gql`
   mutation {
      accept_intro_terms
   }
`;

export const IS_USER_VERIFIED = gql`
   query {
      is_user_verified
   }
`;

export const NEW_VERIFICATION_CODE = gql`
   query ($USER_ID: ID) {
      new_verification_code(USER_ID: $USER_ID)
   }
`;
