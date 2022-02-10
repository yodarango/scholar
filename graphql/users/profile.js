import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
   query ($totalCountOnly: Boolean, $getApprovalCount: Boolean) {
      me {
         ID
         MONGO_DB_ID
         signature
         first_name
         last_name
         birth_date
         gender
         email
         date_registered
         authority_level
         approval_rating
         avatar
         my_church
         my_favorite_color
         my_job
         my_true_color_personality_test
         my_story
         my_ministry
         my_favorite_verse
         all_posts(getApprovalCount: $getApprovalCount) {
            thought_approval_total_count
            quote_approval_total_count
            commentaries_approval_total_count
            commentaries(totalCountOnly: $totalCountOnly) {
               total_count
            }
            quotes(totalCountOnly: $totalCountOnly) {
               total_count
            }
            thoughts(totalCountOnly: $totalCountOnly) {
               total_count
            }
            sermon_notes(totalCountOnly: $totalCountOnly) {
               total_count
            }
         }
      }
   }
`;

export const GET_MY_SETTINGS = gql`
   query {
      me {
         ID
         MONGO_DB_ID
         signature
         first_name
         last_name
         birth_date
         gender
         email
         date_registered
         authority_level
         approval_rating
         avatar
         my_church
         my_favorite_color
         my_job
         my_true_color_personality_test
         my_story
         my_ministry
         my_favorite_verse
      }
   }
`;

export const GET_USER_PROFILE = gql`
   query ($ID: ID, $totalCountOnly: Boolean, $getApprovalCount: Boolean) {
      users(ID: $ID) {
         ID
         MONGO_DB_ID
         signature
         first_name
         last_name
         birth_date
         gender
         email
         date_registered
         authority_level
         approval_rating
         avatar
         my_church
         my_favorite_color
         my_job
         my_true_color_personality_test
         my_story
         my_ministry
         my_favorite_verse
         all_posts(USER_ID: $ID, getApprovalCount: $getApprovalCount) {
            thought_approval_total_count
            quote_approval_total_count
            commentaries_approval_total_count
            commentaries(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
               total_count
            }
            quotes(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
               total_count
            }
            thoughts(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
               total_count
            }
            sermon_notes(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
               total_count
            }
         }
      }
   }
`;

export const GET_PROFILE_COMMENTARIES = gql`
   query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
      users(ID: $ID) {
         all_posts(USER_ID: $ID) {
            #============== COMMENTARIES ============
            commentaries(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
               ID
               USER_ID
               VERSE_ID
               body
               category_tags
               referenced_verses
               verse_citation
               created_date
               posted_on
               comments {
                  total_count
               }
               approvals {
                  average_count
                  total_count
               }
            }
         }
      }
   }
`;

export const GET_PROFILE_QUOTES = gql`
   query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
      users(ID: $ID) {
         all_posts(USER_ID: $ID) {
            #============== QUOTES ============
            quotes(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
               ID
               USER_ID
               body
               category_tags
               author
               background
               created_date
               posted_on
               comments {
                  total_count
               }
               approvals {
                  average_count
                  total_count
               }
            }
         }
      }
   }
`;

export const GET_PROFILE_THOUGHTS = gql`
   query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
      users(ID: $ID) {
         all_posts(USER_ID: $ID) {
            #============== THOUGHTS ============
            thoughts(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
               ID
               body
               USER_ID
               category_tags
               posted_on
               comments {
                  total_count
               }
               approvals {
                  average_count
                  total_count
               }
            }
         }
      }
   }
`;

export const GET_PROFILE_SERMON_NOTES = gql`
   query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
      users(ID: $ID) {
         all_posts(USER_ID: $ID) {
            #============== SERMONS ============
            sermon_notes(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
               ID
               content
               USER_ID
               DROPBOX_ID
               category_tags
               title
               posted_on
               file_url
            }
         }
      }
   }
`;
// ======================= POSTS ROUTES ===================== //
export const UPDATE_MY_SETTINGS = gql`
   mutation (
      $signature: String
      $first_name: String
      $last_name: String
      $birth_date: String
      $gender: String
      $email: String
      $my_church: String
      $my_favorite_color: String
      $my_job: String
      $my_true_color_personality_test: String
      $my_story: String
      $my_favorite_verse: String
      $my_ministry: String
   ) {
      me(
         data: {
            signature: $signature
            first_name: $first_name
            last_name: $last_name
            birth_date: $birth_date
            gender: $gender
            email: $email
            my_church: $my_church
            my_favorite_color: $my_favorite_color
            my_job: $my_job
            my_true_color_personality_test: $my_true_color_personality_test
            my_story: $my_story
            my_favorite_verse: $my_favorite_verse
            my_ministry: $my_ministry
         }
      ) {
         ID
         signature
         first_name
         last_name
         birth_date
         gender
         email
      }
   }
`;
