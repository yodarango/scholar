import { gql } from "@apollo/client";

// user summary the show in the profile
export const GET_MY_USER_SUMMARY = gql`
   query ($isSelf: Boolean, $ID: ID) {
      user_summary(isSelf: $isSelf, ID: $ID) {
         has_new_notifications
         authority_level
         approval_rating
         total_ratings
         total_posts
         signature
         avatar
         ID
      }
   }
`;

// data fro the stats in the profile
export const GET_POSTS_SUMMARY = gql`
   query ($isSelf: Boolean, $ID: ID) {
      get_posts_summary(isSelf: $isSelf, ID: $ID) {
         commentary_count
         thought_count
         sermon_count
         quote_count
      }
   }
`;

// settings that appear in the profile
export const GET_USER_ABOUT_ME = gql`
   query ($isSelf: Boolean, $ID: ID) {
      get_user_about_me(isSelf: $isSelf, ID: $ID) {
         my_true_color_personality_test
         my_favorite_color
         my_favorite_verse
         is_bible_public
         my_ministry
         my_church
         about_me
         my_job
      }
   }
`;

export const GET_USER_ABOUT_ME_PAGE = gql`
   query ($isSelf: Boolean, $ID: ID) {
      get_user_about_me_page(isSelf: $isSelf, ID: $ID) {
         authority_level
         signature
         about_me
         avatar
         ID
      }
   }
`;

// all notifications
export const GET_USER_NOTIFICATIONS = gql`
   query ($ID: ID, $last_id: ID) {
      notifications(ID: $ID, last_id: $last_id) {
         CONTENT_TYPE
         CREATED_BY
         posted_on
         USER_ID
         POST_ID
         body
         ID
      }
   }
`;

// these are the general settings under the settings page
export const GET_USER_GENERAL_SETTINGS = gql`
   query {
      get_user_general_settings {
         my_true_color_personality_test
         my_favorite_color
         my_favorite_verse
         my_ministry
         signature
         my_church
         about_me
         avatar
         my_job
      }
   }
`;

// updates user settings
export const UPDATE_GENERAL_SETTINGS = gql`
   mutation (
      $my_true_color_personality_test: String
      $my_favorite_color: String
      $my_favorite_verse: String
      $my_ministry: String
      $my_church: String
      $my_job: String
   ) {
      update_general_settings(
         data: {
            my_true_color_personality_test: $my_true_color_personality_test
            my_favorite_color: $my_favorite_color
            my_favorite_verse: $my_favorite_verse
            my_ministry: $my_ministry
            my_church: $my_church
            my_job: $my_job
         }
      ) {
         my_true_color_personality_test
         my_favorite_color
         my_favorite_verse
         my_ministry
         my_church
         my_job
      }
   }
`;

// updates user avatar
export const UPDATE_MY_AVATAR = gql`
   mutation ($avatar: String) {
      update_user_avatar(data: { avatar: $avatar }) {
         avatar
      }
   }
`;

// updates user signature
export const UPDATE_MY_SIGNATURE = gql`
   mutation ($signature: String) {
      update_signature(data: { signature: $signature }) {
         signature
      }
   }
`;

// updates user signature
export const UPDATE_ABOUT_ME = gql`
   mutation ($body: String) {
      update_about_me(data: { body: $body })
   }
`;
