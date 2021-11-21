import { gql } from "@apollo/client";

export const GET_QUOTES = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String) {
      quote(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags) {
         ID
         USER_ID
         body
         category_tags
         author
         background
         created_date
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments {
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
