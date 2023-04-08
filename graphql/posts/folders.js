import { gql } from "@apollo/client";

// get folders
export const GET_FOLDER_POST_COUNT = gql`
   query ($ID: ID, $USER_ID: ID, $name: String, $isSelf: Boolean, $query_type: String) {
      get_commentary_folder(
         ID: $ID
         USER_ID: $USER_ID
         name: $name
         isSelf: $isSelf
         query_type: $query_type
      ) {
         ID
         post_count
         name
         image
      }
   }
`;

export const DELETE_FOLDER = gql`
   mutation ($ID: ID) {
      delete_folder(ID: $ID) {
         ID
      }
   }
`;
