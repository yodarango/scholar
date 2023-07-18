import { client } from "../../../apollo-client";
import { EDIT_ARTICLE } from "../../../graphql/posts/articles";

// data
import { errorMessages } from "../../../data/error_messages";

export const handleEditArticle = async (
   ID: string,
   body: string,
   title: string,
   categoryTags: string[],
   referencedVerses: string[]
) => {
   try {
      const { data } = await client.mutate({
         mutation: EDIT_ARTICLE,
         variables: {
            ID,
            body,
            title,
            category_tags: categoryTags,
            referenced_verses: referencedVerses
         }
      });
      if (data.edit_article) {
         return data.edit_article;
      } else {
         return errorMessages.posts.failToPostCommentary;
      }
   } catch (error) {
      console.error(error);
      return errorMessages.posts.failToPostCommentary;
   }
};
