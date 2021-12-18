import { gql } from "@apollo/client";

export const GET_MONDAY_CONTENT = gql`
   query ($ID: ID, $category_tags: String, $last_id: ID) {
      monday {
         id
         imageArray
         rawHtml
         video {
            videoLink
            text
         }
      }
      # commentaries
      commentary(last_id: $last_id) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
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
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }

      # thought
      thought(last_id: $last_id) {
         ID
         title
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
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }

      # quote
      quote_stories(ID: $ID, category_tags: $category_tags, last_id: $last_id) {
         ID
         creator {
            ID
            avatar
            signature
            approval_rating
         }
      }

      # sermon notes
      sermon_notes(last_id: $last_id) {
         ID
         content
         USER_ID
         category_tags
         creator {
            ID
            signature
            authority_level
            approval_rating
         }
      }
   }
`;
