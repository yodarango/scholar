import { gql } from "@apollo/client";

// get folders
export const GET_FOLDER_POST_COUNT = gql`
   query ($ID: ID, $USER_ID: ID, $name: String, $query_type: String) {
      get_commentary_folder(ID: $ID, USER_ID: $USER_ID, name: $name, query_type: $query_type) {
         ID
         post_count
         is_private
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
         ... on Folder {
            ID
         }

         ... on ExceedsPostCount {
            message
         }

         ... on NotAuthorized {
            message
         }
      }
   }
`;

export const SAVE_TO_FOLDER = gql`
   mutation ($folder_id: ID, $post_id: ID) {
      save_to_folder(data: { folder_id: $folder_id, post_id: $post_id }) {
         ID
      }
   }
`;
