import client from "../../../apollo-client";
import { EDIT_THOUGHT } from "../../../graphql/posts/thoughts";

// data
import { errorMessages } from "../../../data/error_messages";

export const handleEditThought = async (
   ID: string,
   body: string,
   title: string,
   categoryTags: string[],
   referencedVerses: string[]
) => {
   try {
      const { data } = await client.mutate({
         mutation: EDIT_THOUGHT,
         variables: {
            ID,
            body,
            title,
            category_tags: categoryTags,
            referenced_verses: referencedVerses
         }
      });
      if (data.edit_thought) {
         return data.edit_thought;
      } else {
         return errorMessages.posts.failToPostCommentary;
      }
   } catch (error) {
      console.log(error);
      return errorMessages.posts.failToPostCommentary;
   }
};
