import { gql } from "@apollo/client";

export const GET_MOST_POPULAR = gql`
   {
      getMostPopularArticles {
         id
         title
         fileUrl
         categoryTags
         tagColors
         description
         currentRanking
         totalReviews
         userId
         user {
            fullName
         }
      }
      getMostPopularBlogs {
         id
         thumbnail
         blogName
         description
         blogUrl
         userId
         user {
            fullName
         }
      }
      getMostPopularBooks {
         id
         title
         author
         categoryTags
         tagColors
         description
         bookUrl
         thumbnail
         currentRanking
         totalReviews
      }
      getMostPopularPodcasts {
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
         userId
         user {
            fullName
         }
      }
      getMostPopularSermons {
         id
         title
         thumbnail
         addedOn
         sermonUrl
         categoryTags
         tagColors
         description
         currentRanking
         totalReviews
         userId
         user {
            fullName
         }
      }
      getMostPopularSermonNotes {
         id
         title
         uploadedDate
         fileUrl
         categoryTags
         tagColors
         description
         userId
         currentRanking
         totalReviews
         user {
            fullName
            avatar
         }
      }
   }
`;
