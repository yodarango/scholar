import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
   query (
      $skip: String
      $dateOrd: String
      $alphOrd: String
      $userId: ID
      $blogName: String
      $id: ID
   ) {
      blogs(
         skip: $skip
         dateOrd: $dateOrd
         alphOrd: $alphOrd
         userId: $userId
         blogName: $blogName
         id: $id
      ) {
         id
         thumbnail
         blogName
         blogUrl
         currentRanking
         user {
            fullName
         }
      }
   }
`;
