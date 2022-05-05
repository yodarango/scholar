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
export const QUOTE_STORIES_IN_LAST_24 = gql`
   query ($ID: ID, $last_id: ID, $category_tags: String) {
      quote_stories(ID: $ID, category_tags: $category_tags, last_id: $last_id) {
         ID
         creator {
            ID
            avatar
            signature
            approval_rating
            authority_level
         }
      }
   }
`;

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
            creator_authority_level
            posted_on
            creator_id
         }
      }
   }
`;

export const GET_ONE_QUOTE = gql`
   query ($ID: ID, $showComment: Boolean) {
      quote(ID: $ID) {
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
         }
         comments(showComment: $showComment) {
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const GET_EDIT_QUOTE = gql`
   query ($ID: ID) {
      quote(ID: $ID) {
         ID
         USER_ID
         body
         category_tags
         author
         background
         creator {
            ID
         }
      }
   }
`;

// ========================  POST ===================
export const CREATE_NEW_QUOTE = gql`
   mutation ($body: String, $category_tags: String, $author: String, $background: String) {
      quote(
         data: {
            body: $body
            category_tags: $category_tags
            author: $author
            background: $background
         }
      ) {
         ... on Quote {
            ID
            USER_ID
            body
         }

         ... on ExceedsPostCount {
            message
         }
      }
   }
`;

export const REPORT_QUOTE = gql`
   mutation ($QUOTE_ID: ID) {
      report_quote(data: { QUOTE_ID: $QUOTE_ID }) {
         ID
         QUOTE_ID
      }
   }
`;

//====================== EDIT ROUTES ==================== //
export const EDIT_ONE_QUOTE = gql`
   mutation ($body: String, $category_tags: String, $author: String, $ID: ID, $background: String) {
      edit_quote(
         data: {
            body: $body
            category_tags: $category_tags
            author: $author
            ID: $ID
            background: $background
         }
      ) {
         ID
      }
   }
`;

// ============= DELETE ROUTES=================================
export const DELETE_ONE_QUOTE = gql`
   mutation ($ID: ID) {
      delete_one_quote(ID: $ID) {
         ID
      }
   }
`;
