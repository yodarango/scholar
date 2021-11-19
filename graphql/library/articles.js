import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
   query (
      $skip: String
      $category: String
      $alphOrd: String
      $dateOrd: String
      $userId: ID
      $title: String
      $id: ID
   ) {
      articles(
         skip: $skip
         category: $category
         alphOrd: $alphOrd
         dateOrd: $dateOrd
         userId: $userId
         title: $title
         id: $id
      ) {
         id
         title
         fileUrl
         categoryTags
         tagColors
         description
         currentRanking
         userId
         user {
            fullName
         }
      }
   }
`;
