import { gql } from "@apollo/client";

export const GET_SERMON_NOTES = gql`
   query (
      $skip: String
      $category: String
      $alphOrd: String
      $dateOrd: String
      $userId: ID
      $id: ID
      $title: String
   ) {
      sermonNotes(
         skip: $skip
         category: $category
         alphOrd: $alphOrd
         dateOrd: $dateOrd
         userId: $userId
         id: $id
         title: $title
      ) {
         id
         title
         userId
         categoryTags
         tagColors
         currentRanking
         totalReviews
         fileUrl
         user {
            fullName
            avatar
         }
      }
   }
`;
