import { gql } from "@apollo/client";

export const GET_FRIDAY_CONTENT = gql`
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
         fileUrl
         user {
            fullName
            avatar
         }
      }
      friday {
         id
         question
         firstOption
         secondOption
         thirdOption
         fourthOption
         votes {
            id
            contentId
            firstOption
            secondOption
            thirdOption
            fourthOption
         }
      }
   }
`;
