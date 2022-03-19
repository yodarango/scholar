import { gql } from "@apollo/client";

export const GET_PODCASTS = gql`
   query (
      $skip: String
      $alphOrd: String
      $dateOrd: String
      $userId: ID
      $podcastName: String
      $id: ID
   ) {
      podcasts(
         skip: $skip
         alphOrd: $alphOrd
         dateOrd: $dateOrd
         userId: $userId
         podcastName: $podcastName
         id: $id
      ) {
         id
         thumbnail
         podcastName
         description
         appleLink
         spotifyLink
         googleLink
         overcastLink
         currentRanking
         totalReviews
         user {
            fullName
            avatar
         }
      }
   }
`;
