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

export const GET_FOLDER = gql`
   query ($ID: ID) {
      get_folder(ID: $ID) {
         ID
         description
         name
         image
         is_private
         color
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

export const EDIT_FOLDER = gql`
   mutation (
      $ID: ID
      $name: String
      $description: String
      $image: String
      $is_private: Boolean
      $color: String
   ) {
      edit_folder(
         data: {
            ID: $ID
            name: $name
            description: $description
            image: $image
            is_private: $is_private
            color: $color
         }
      ) {
         ID
      }
   }
`;

export const NEW_FOLDER = gql`
   mutation (
      $name: String
      $description: String
      $image: String
      $is_private: Boolean
      $color: String
   ) {
      new_folder(
         data: {
            name: $name
            description: $description
            image: $image
            is_private: $is_private
            color: $color
         }
      ) {
         ID
      }
   }
`;
