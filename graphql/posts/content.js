import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
   query ($cID: ID, $qID: ID, $tID: ID) {
      all_posts(cID: $cID, qID: $qID, tID: $tID) {
         ID
         POST_TYPE
         VERSE_ID
         AUTHORITY_LEVEL
         body
         folder_id
         folder_name
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
