import { gql } from "@apollo/client";

// ================= CHANGE STORY =============
export const DELETE_MY_ACCOUNT = gql`
   mutation ($password: String) {
      delete_my_account(password: $password)
   }
`;
