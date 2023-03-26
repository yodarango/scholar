import { gql } from "@apollo/client";

// get folders
export const GET_FOLDER_POST_COUNT = gql`
   query ($ID: ID, $USER_ID: ID, $name: String, $isSelf: Boolean) {
      get_commentary_folder(ID: $ID, USER_ID: $USER_ID, name: $name, isSelf: $isSelf) {
         post_count
         name
      }
   }
`;
