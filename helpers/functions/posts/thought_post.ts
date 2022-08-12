import client from "../../../apollo-client";
import { CREATE_NEW_THOUGHT } from "../../../graphql/posts/thoughts";

// data
import { errorMessages } from "../../../data/error_messages";

export const handlePostThought = async (
   title: string,
   body: string,
   categoryTags: string[],
   referencedVerses: string[]
) => {
   try {
      const { data } = await client.mutate({
         mutation: CREATE_NEW_THOUGHT,
         variables: {
            body,
            title,
            category_tags: categoryTags,
            referenced_verses: referencedVerses
         }
      });

      if (data.commentary.__typename === "Thought") {
         return data.commentary;
      } else if (data.commentary.__typename === "ExceedsPostCount") {
         return errorMessages.posts.maxPostCount;
      } else {
         return errorMessages.posts.failToPostCommentary;
      }
   } catch (error: any) {
      console.log(error);
      return errorMessages.posts.failToPostCommentary;
   }
};
