import client from "../../../apollo-client";
import { EDIT_COMMENTARY } from "../../../graphql/posts/commentaries";

// data
import { errorMessages } from "../../../data/error_messages";

export const handleEditommentary = async (
   ID: string,
   body: string,
   isPrivate: boolean,
   categoryTags: string[],
   referencedVerses: string[]
) => {
   try {
      const { data } = await client.mutate({
         mutation: EDIT_COMMENTARY,
         variables: {
            ID,
            body,
            is_private: isPrivate,
            category_tags: categoryTags,
            referenced_verses: referencedVerses
         }
      });
      if (data.edit_commentary) {
         return data.edit_commentary;
      } else {
         return errorMessages.posts.failToPostCommentary;
      }
   } catch (error) {
      console.error(error);
      return errorMessages.posts.failToPostCommentary;
   }
};
