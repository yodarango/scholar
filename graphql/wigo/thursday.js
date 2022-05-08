import { gql } from "@apollo/client";

export const GET_THURSDAY_CONTENT = gql`
   query ($last_id: ID) {
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
      quote_stories(last_id: $last_id) {
         ID
         approvals {
            total_count
            average_count
         }
         creator {
            ID
            avatar
            signature
            approval_rating
            authority_level
            my_church
            first_name
            last_name
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

export const HANDLE_VOTE = gql`
   mutation ($votesUp: Int, $votesDown: Int, $contentId: ID) {
      thursdayVotes(content: { votesUp: $votesUp, votesDown: $votesDown, contentId: $contentId }) {
         votesUp
         votesDown
         contentId
      }
   }
`;
