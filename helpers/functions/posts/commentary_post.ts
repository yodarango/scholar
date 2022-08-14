import client from "../../../apollo-client";
import { CREATE_NEW_COMMENTARY } from "../../../graphql/posts/commentaries";

// data
import { errorMessages } from "../../../data/error_messages";

export type ThandlePostCommentary = {
   verseId: string;
   body: string;
   isPrivate: boolean;
   categoryTag: string;
   referencedVerses: string[];
   verseCitation: string;
   postImage: string;
};

export const handlePostCommentary = async (post: ThandlePostCommentary) => {
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
            postImage
         }
      });

      if (data.commentary.__typename === "Commentary") {
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
