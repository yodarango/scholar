import { client } from "../../../apollo-client";
import { CREATE_NEW_THOUGHT } from "../../../graphql/posts/thoughts";

// data
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

export type THandlePostThought = {
   title: string;
   body: string;
   categoryTag: string;
   referencedVerses: string[];
   postImage: string; // not in DB implement this field
};

export const dataHandler = async (post: THandlePostThought) => {
   const { body, title, categoryTag, referencedVerses, postImage } = post;

   try {
      const { data } = await client.mutate({
         mutation: CREATE_NEW_THOUGHT,
         variables: {
            body,
            title,
            category_tags: categoryTag,
            post_image: postImage,
            referenced_verses: referencedVerses.toString().replaceAll(", ", "")
         }
      });

      console.log(data);
      if (data.thought.__typename === "Thought") {
         return { success: notificationMessages.postSuccess };
      } else if (data.thought.__typename === "ExceedsPostCount") {
         return { error: errorMessages.posts.maxPostCount };
      } else {
         return { error: errorMessages.posts.failToPostCommentary };
      }
   } catch (error: any) {
      console.error(error);
      return { error: errorMessages.posts.failToPostCommentary };
   }
};

export const handlePostThought = async (post: THandlePostThought) => {
   try {
      if (!post.categoryTag) return { error: errorMessages.posts.missingCategoryTag };
      if (!post.title) return { error: errorMessages.posts.missingTitle };
      if (!post.body || post.body === "") return { error: errorMessages.posts.emptyBody };
      return await dataHandler(post);
   } catch (error) {
      console.error(error);
   }
};
