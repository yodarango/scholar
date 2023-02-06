import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
   query ($last_id: ID) {
      all_posts(last_id: $last_id) {
         ID
         POST_TYPE
         VERSE_ID
         AUTHORITY_LEVEL
         body
         category_tags
         post_image
         referenced_verses
         verse_citation
         author
         background
         created_date
         posted_on
         is_private
         total_posts
         USER_ID
         signature
         authority_level
         approval_rating
         first_name
         last_name
         my_church
         avatar
         total_comment_count
         average_rating_count
         total_rating_count
      }
   }
`;
