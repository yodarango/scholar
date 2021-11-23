import { gql } from "@apollo/client";

export const GET_SATURDAY_CONTENT = gql`
   query ($ID: ID, $category_tags: String) {
      saturday {
         id
         title
         context
         html
         image
         link
      }

      # commentaries
      commentary {
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
      thought {
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

      # quote
      quotes_in_last_24(ID: $ID, category_tags: $category_tags) {
         ID
         creator {
            ID
            avatar
            signature
            approval_rating
         }
      }

      # sermon notes
      sermon_notes {
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
