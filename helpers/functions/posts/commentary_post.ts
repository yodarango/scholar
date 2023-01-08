import { client } from "../../../apollo-client";
import { CREATE_NEW_COMMENTARY } from "../../../graphql/posts/commentaries";

// data
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

export type ThandlePostCommentary = {
   verseId: string;
   body: string;
   isPrivate: boolean;
   categoryTag: string;
   referencedVerses: string[];
   verseCitation: string;
   postImage: string;
};

const dataHandler = async (post: ThandlePostCommentary) => {
   const { verseId, body, isPrivate, categoryTag, referencedVerses, verseCitation, postImage } =
      post;
   try {
      const { data } = await client.mutate({
         mutation: CREATE_NEW_COMMENTARY,
         variables: {
            VERSE_ID: verseId,
            body,
            is_private: isPrivate,
            category_tags: categoryTag,
            referenced_verses: referencedVerses.toString().replaceAll(", ", ""),
            verse_citation: verseCitation,
            post_image: postImage
         }
      });

      if (data.commentary.__typename === "Commentary") {
         return { success: notificationMessages.postSuccess };
      } else if (data.commentary.__typename === "ExceedsPostCount") {
         return { error: errorMessages.posts.maxPostCount };
      } else {
         return { error: errorMessages.posts.failToPostCommentary };
      }
   } catch (error: any) {
      console.error(error);
      return { error: errorMessages.posts.failToPostCommentary };
   }
};

export const handlePostCommentary = async (post: ThandlePostCommentary) => {
   try {
      if (!post.categoryTag) return { error: errorMessages.posts.missingCategoryTag };
      if (!post.verseId) return { error: errorMessages.posts.missingVerse };
      if (!post.body || post.body === "") return { error: errorMessages.posts.emptyBody };
      return await dataHandler(post);
   } catch (error) {
      console.error(error);
   }
};
