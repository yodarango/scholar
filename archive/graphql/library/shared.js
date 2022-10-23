import { gql } from "@apollo/client";

export const HANDLE_CONTENT_REVIEW = gql`
   mutation ($contentId: ID, $starsRated: Float, $contentType: LibraryContentType) {
      handleContentReview(
         data: { contentId: $contentId, starsRated: $starsRated, contentType: $contentType }
      ) {
         id
         newRating
         totalReviews
      }
   }
`;
