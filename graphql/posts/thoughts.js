import { gql } from "@apollo/client";

export const GET_THOUGHTS = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String) {
      thought(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags) {
         ID
         body
         USER_ID
         category_tags
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

export const SHOW_COMMENTS_OF_THOUGHTS = gql`
   query ($ID: ID, $showComment: Boolean) {
      thought(ID: $ID) {
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
