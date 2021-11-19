import { gql } from "@apollo/client";
export const GET_BOOKS = gql`
   query ($skip: String, $category: String, $author: String, $title: String) {
      books(skip: $skip, category: $category, title: $title, author: $author) {
         id
         title
         author
         categoryTags
         tagColors
         bookUrl
         currentRanking
         thumbnail
      }
   }
`;
