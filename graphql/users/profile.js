import { gql } from "@apollo/client";

export const GET_PROFILE_INFO = gql`
   query ($ID: ID, $totalCountOnly: Boolean) {
      users(ID: $ID) {
         ID
         MONGO_DB_ID
         signature
         first_name
         last_name
         birth_date
         gender
         email
         password
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
         all_posts {
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
