import { gql } from "@apollo/client";

export const GET_THURSDAY_CONTENT = gql`
   query ($ID: ID, $category_tags: String) {
      thursday {
         id
         poll
         countdownLimit
         votes {
            votesDown
            votesUp
            contentId
         }
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
      quote_stories(ID: $ID, category_tags: $category_tags) {
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
