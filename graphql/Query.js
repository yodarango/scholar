import { gql } from "@apollo/client";

export const GET_MOST_POPULAR = gql`
   {
      getMostPopularArticles {
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
      getMostPopularBlogs {
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
         title
         author
         categoryTags
         tagColors
         description
         bookUrl
         currentRanking
      }
      getMostPopularPodcasts {
         thumbnail
         podcastName
         description
         appleLink
         spotifyLink
         googleLink
         overcastLink
         currentRanking
         userId
         user {
            fullName
         }
      }
      getMostPopularSermons {
         title
         thumbnail
         addedOn
         sermonUrl
         categoryTags
         tagColors
         description
         currentRanking
         userId
         user {
            fullName
         }
      }
      getMostPopularSermonNotes {
         title
         uploadedDate
         fileUrl
         userAvatar
         categoryTags
         tagColors
         description
         userId
         currentRanking
         user {
            fullName
            avatar
         }
      }
   }
`;
