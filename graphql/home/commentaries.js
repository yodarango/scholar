import { gql } from "@apollo/client";

export const GET_COMMENTARIES = gql`
   query (
      $authority_level: Int
      $ID: ID
      $category_tags: String
      $USER_ID: ID
      $last_id: String
      $VERSE_ID: String
   ) {
      v_by_v_commentaries(
         ID: $ID
         USER_ID: $USER_ID
         VERSE_ID: $VERSE_ID
         category_tags: $category_tags
         last_id: $last_id
         authority_level: $authority_level
      ) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_on
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments {
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const SHOW_COMMENTS_OF_COMMENTARY = gql`
   query ($ID: ID, $showComment: Boolean) {
      commentary(ID: $ID) {
         comments(showComment: $showComment) {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            posted_on
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;
