import { gql } from "@apollo/client";

export const GET_SERMONS = gql`
   query (
      $skip: String
      $category: String
      $alphOrd: String
      $dateOrd: String
      $userId: ID
      $title: String
      $id: ID
   ) {
      sermons(
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
         thumbnail
         sermonUrl
         categoryTags
         tagColors
         description
         currentRanking
         userId
         user {
            fullName
            avatar
         }
      }
   }
`;
