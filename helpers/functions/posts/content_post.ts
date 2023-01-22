import { client } from "../../../apollo-client";
import { CREATE_NEW_THOUGHT } from "../../../graphql/posts/thoughts";
import { CREATE_NEW_COMMENTARY } from "../../../graphql/posts/commentaries";
import { CREATE_NEW_QUOTE } from "../../../graphql/posts/quotes";
import { CREATE_NEW_SERMON_NOTE } from "../../../graphql/posts/sermon_notes";

// data
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

// constants
import { DEFAULT_THOUGHT_IMAGE, DEFAULT_COMMENTARY_IMAGE } from "../../../constants/defaults";
import commentaries_one_line_carrouselStories from "../../../components/layouts/scrollers/user_content/commentaries_one_line_carrousel.stories";

export type THandlePostContent = {
   title?: string;
   body?: string;
   category_tags?: string;
   referenced_verses?: string[] | string;
   post_image?: string;
   VERSE_ID?: string;
   is_private?: boolean;
   verse_citation?: string;
   author?: String;
   background?: String;
};

export const dataHandler = async (variables: THandlePostContent, QUERY: any, type: string) => {
   try {
      const { data } = await client.mutate({
         mutation: QUERY,
         variables
      });

      if (data[type.toLowerCase()].__typename === type) {
         return { success: notificationMessages.postSuccess };
      } else if (data[type.toLowerCase()].__typename === "ExceedsPostCount") {
         return { error: errorMessages.posts.maxPostCount };
      } else {
         return { error: errorMessages.posts.failToPostCommentary };
      }
   } catch (error: any) {
      console.error(error);
      return { error: errorMessages.posts.failToPostCommentary };
   }
};

export const handlePostContent = async (variables: THandlePostContent, type: string) => {
   console.log(variables, type);
   let QUERY;
   variables.category_tags = variables
      ? variables.category_tags?.toString().replaceAll(", ", "")
      : "";
   try {
      if (type === "Thought") {
         QUERY = CREATE_NEW_THOUGHT;
         variables.referenced_verses = variables
            ? variables?.referenced_verses?.toString().replaceAll(", ", "")
            : "";

         if (!variables.post_image) variables.post_image = DEFAULT_THOUGHT_IMAGE;
         if (!variables.category_tags) return { error: errorMessages.posts.missingCategoryTag };
         if (!variables.title) return { error: errorMessages.posts.missingTitle };
         if (!variables.body || variables.body === "")
            return { error: errorMessages.posts.emptyBody };
      } else if (type === "Commentary") {
         QUERY = CREATE_NEW_COMMENTARY;
         variables.referenced_verses = variables
            ? variables?.referenced_verses?.toString().replaceAll(", ", "")
            : "";

         if (!variables.post_image) variables.post_image = DEFAULT_COMMENTARY_IMAGE;
         if (!variables.category_tags) return { error: errorMessages.posts.missingCategoryTag };
         if (!variables.VERSE_ID) return { error: errorMessages.posts.missingVerse };
         if (!variables.body || variables.body === "")
            return { error: errorMessages.posts.emptyBody };
      } else if (type === "Quote") {
         variables;
         QUERY = CREATE_NEW_QUOTE;

         if (!variables.background) variables.background = "#quote-bkg--0";
         if (!variables.body || variables.body === "")
            return { error: errorMessages.posts.emptyBody };
         if (!variables.category_tags) return { error: errorMessages.posts.missingCategoryTag };
         if (!variables.author) return { error: errorMessages.posts.missingAuthor };
      }

      return await dataHandler(variables, QUERY, type);
   } catch (error) {
      console.error(error);
   }
};
