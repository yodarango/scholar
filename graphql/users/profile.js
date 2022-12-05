import { gql } from "@apollo/client";

// export const GET_MY_PROFILE = gql`
//    query ($totalCountOnly: Boolean, $getApprovalCount: Boolean) {
//       me {
//          ID
//          MONGO_DB_ID
//          signature
//          first_name
//          last_name
//          birth_date
//          gender
//          email
//          date_registered
//          authority_level
//          approval_rating
//          avatar
//          has_new_notifications
//          my_church
//          my_favorite_color
//          my_job
//          my_true_color_personality_test
//          my_story
//          my_ministry
//          my_favorite_verse
//          first_time_signup
//          user_confirmed
//          all_posts_profile(getApprovalCount: $getApprovalCount) {
//             thought_approval_total_count
//             quote_approval_total_count
//             commentaries_approval_total_count
//             commentaries(totalCountOnly: $totalCountOnly) {
//                total_count
//             }
//             quotes(totalCountOnly: $totalCountOnly) {
//                total_count
//             }
//             thoughts(totalCountOnly: $totalCountOnly) {
//                total_count
//             }
//             sermon_notes(totalCountOnly: $totalCountOnly) {
//                total_count
//             }
//          }
//       }
//    }
// `;

// export const GET_MY_SETTINGS = gql`
//    query {
//       me {
//          ID
//          MONGO_DB_ID
//          signature
//          first_name
//          last_name
//          birth_date
//          gender
//          email
//          date_registered
//          authority_level
//          approval_rating
//          avatar
//          my_church
//          my_favorite_color
//          my_job
//          my_true_color_personality_test
//          my_story
//          my_ministry
//          my_favorite_verse
//       }
//    }
// `;

// export const GET_CONTENT_CREATOR = gql`
//    query ($ID: ID) {
//       users(ID: $ID) {
//          ID
//          avatar
//          signature
//          authority_level
//          approval_rating
//          my_church
//          first_name
//          last_name
//       }
//    }
// `;

// // gets the amount of verses for each book of the bible and the user they belong to
// export const GET_COMMETNARIES_BY_BOOK_DATA = gql`
//    query ($USER_ID: ID) {
//       users(ID: $USER_ID) {
//          ID
//          signature
//       }
//       commentaries_by_book_count(USER_ID: $USER_ID) {
//          genesis
//          exodus
//          leviticus
//          numbers
//          deuteronomy
//          joshua
//          judges
//          ruth
//          one_samuel
//          two_samuel
//          one_kings
//          two_kings
//          one_chronicles
//          two_chronicles
//          ezra
//          nehemiah
//          esther
//          job
//          psalms
//          proverbs
//          ecclesiastes
//          sing_of_songs
//          isaiah
//          jeremiah
//          lamentations
//          ezekiel
//          daniel
//          hosea
//          joel
//          amos
//          obadiah
//          jonah
//          micah
//          nahum
//          habakkuk
//          zephaniah
//          haggai
//          zechariah
//          malachi
//          matthew
//          mark
//          luke
//          john
//          acts
//          romans
//          one_corinthians
//          two_corinthians
//          galatians
//          ephesians
//          philippians
//          colossians
//          one_thessalonians
//          two_thessalonians
//          one_timothy
//          two_timothy
//          titus
//          philemon
//          hebrews
//          james
//          one_peter
//          two_peter
//          one_john
//          two_john
//          three_john
//          jude
//          revelation
//       }
//    }
// `;
// export const GET_USER_PROFILE = gql`
//    query ($ID: ID, $totalCountOnly: Boolean, $getApprovalCount: Boolean) {
//       users(ID: $ID) {
//          ID
//          MONGO_DB_ID
//          signature
//          first_name
//          last_name
//          birth_date
//          gender
//          email
//          date_registered
//          authority_level
//          approval_rating
//          avatar
//          my_church
//          my_favorite_color
//          my_job
//          my_true_color_personality_test
//          my_story
//          my_ministry
//          my_favorite_verse
//          all_posts(USER_ID: $ID, getApprovalCount: $getApprovalCount) {
//             thought_approval_total_count
//             quote_approval_total_count
//             commentaries_approval_total_count
//             commentaries(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
//                total_count
//             }
//             quotes(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
//                total_count
//             }
//             thoughts(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
//                total_count
//             }
//             sermon_notes(totalCountOnly: $totalCountOnly, USER_ID: $ID) {
//                total_count
//             }
//          }
//       }
//    }
// `;

// export const GET_PROFILE_COMMENTARIES = gql`
//    query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
//       users(ID: $ID) {
//          all_posts(USER_ID: $ID) {
//             #============== COMMENTARIES ============
//             commentaries(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
//                ID
//                USER_ID
//                VERSE_ID
//                body
//                category_tags
//                referenced_verses
//                verse_citation
//                created_date
//                posted_on
//                comments {
//                   total_count
//                }
//                approvals {
//                   average_count
//                   total_count
//                }
//             }
//          }
//       }
//    }
// `;

// export const GET_PROFILE_QUOTES = gql`
//    query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
//       users(ID: $ID) {
//          all_posts(USER_ID: $ID) {
//             #============== QUOTES ============
//             quotes(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
//                ID
//                USER_ID
//                body
//                category_tags
//                author
//                background
//                created_date
//                posted_on
//                comments {
//                   total_count
//                }
//                approvals {
//                   average_count
//                   total_count
//                }
//             }
//          }
//       }
//    }
// `;

// export const GET_PROFILE_THOUGHTS = gql`
//    query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
//       users(ID: $ID) {
//          all_posts(USER_ID: $ID) {
//             #============== THOUGHTS ============
//             thoughts(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
//                ID
//                body
//                USER_ID
//                category_tags
//                referenced_verses
//                posted_on
//                comments {
//                   total_count
//                }
//                approvals {
//                   average_count
//                   total_count
//                }
//             }
//          }
//       }
//    }
// `;

// export const GET_PROFILE_SERMON_NOTES = gql`
//    query ($ID: ID, $totalCountOnly: Boolean, $last_id: ID) {
//       users(ID: $ID) {
//          all_posts(USER_ID: $ID) {
//             #============== SERMONS ============
//             sermon_notes(totalCountOnly: $totalCountOnly, USER_ID: $ID, last_id: $last_id) {
//                ID
//                content
//                USER_ID
//                DROPBOX_ID
//                category_tags
//                title
//                posted_on
//                file_url
//             }
//          }
//       }
//    }
// `;

// export const CHECK_IF_USER_LOGGED_IN = gql`
//    query {
//       is_user_logged_in
//    }
// `;

// export const CHECK_IF_USER_LOGGED_IN_AND_VERIFIED = gql`
//    query {
//       is_user_logged_in_and_verified
//    }
// `;

// // ======================= POSTS ROUTES ===================== //
// export const UPDATE_MY_SETTINGS = gql`
//    mutation (
//       $signature: String
//       $MONGO_DB_ID: String
//       $first_name: String
//       $last_name: String
//       $birth_date: String
//       $gender: Int
//       $email: String
//       $my_church: String
//       $my_favorite_color: String
//       $my_job: String
//       $my_true_color_personality_test: String
//       $my_story: String
//       $my_favorite_verse: String
//       $my_ministry: String
//    ) {
//       me(
//          data: {
//             signature: $signature
//             MONGO_DB_ID: $MONGO_DB_ID
//             first_name: $first_name
//             last_name: $last_name
//             birth_date: $birth_date
//             gender: $gender
//             email: $email
//             my_church: $my_church
//             my_favorite_color: $my_favorite_color
//             my_job: $my_job
//             my_true_color_personality_test: $my_true_color_personality_test
//             my_story: $my_story
//             my_favorite_verse: $my_favorite_verse
//             my_ministry: $my_ministry
//          }
//       ) {
//          ... on User {
//             ID
//             signature
//             first_name
//             last_name
//             birth_date
//             gender
//             email
//          }
//          ... on DatabaseError {
//             message
//          }

//          ... on UserUpdated {
//             update_successful
//          }

//          ... on SignatureAlreadyTaken {
//             message
//          }
//          ... on EmailExists {
//             message
//          }
//       }
//    }
// `;

// // ================= CHANGE STORY =============
// export const UPDATE_MY_STORY = gql`
//    mutation ($body: String) {
//       update_my_story(body: $body)
//    }
// `;

// //=================== CHNAGE PASSWORD ================//
// export const VALIDATE_CURRENT_PASSWORD = gql`
//    mutation ($currPassword: String, $newPassword: String) {
//       change_password(currPassword: $currPassword, newPassword: $newPassword) {
//          ... on UserUpdated {
//             update_successful
//          }
//          ... on IncorrecctCredentials {
//             message
//          }
//          ... on ServerError {
//             message
//          }
//       }
//    }
// `;

// export const UPDATE_MY_AVATAR = gql`
//    mutation ($avatar: String) {
//       update_user_avatar(avatar: $avatar)
//    }
// `;

// export const ACCEPT_INTRO_INTRUCTIONS = gql`
//    mutation {
//       accept_intro_terms
//    }
// `;

export const GET_MY_USER_SUMMARY = gql`
   query ($isSelf: Boolean) {
      user_summary(isSelf: $isSelf) {
         ID
         signature
         avatar
         has_new_notifications
         total_posts
         authority_level
         approval_rating
         total_ratings
      }
   }
`;
