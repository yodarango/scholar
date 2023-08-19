import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
   query ($last_id: ID) {
      posts(last_id: $last_id) {
         ID
         POST_TYPE
         VERSE_ID
         body
         FOLDER_ID
         folder_name
         category_tags
         post_image
         referenced_verses
         verse_citation
         author
         background
         created_on
         posted_on
         is_private
         USER_ID
         signature
         avatar
         total_comment_count
         average_rating_count
         total_rating_count
         creator {
            authority_level
            signature
            avatar
            ID
         }
      }
   }
`;
