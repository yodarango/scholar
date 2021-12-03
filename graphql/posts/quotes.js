import { gql } from "@apollo/client";

export const GET_QUOTES = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String, $showComment: Boolean) {
      quote(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags, showComment: $showComment) {
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

// used in /wigo to get only the avatars of those who have quote in the past 24 hours
export const OPEN_QUOTE_STORY = gql`
   query ($USER_ID: ID, $last_id: ID) {
      quote(USER_ID: $USER_ID, last_id: $last_id) {
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
`;

// used in the open story to get the comments for each quote
export const OPEN_QUOTE_STORY_COMMENTS = gql`
   query ($ID: ID, $showComment: Boolean) {
      quote(ID: $ID) {
         comments(showComment: $showComment) {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
         }
      }
   }
`;
