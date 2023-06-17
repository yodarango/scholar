/****************************************************************************************
 * Very flexible  and complex function. It is used to edit and create all kinds of posts.
 * The four arguments are:
 *    - variables: the fields to save to DB
 *    - type: The name of the content (Commentary, Thought, Quote)
 *    - requestType: the name of the graphql query
 ****************************************************************************************/

import { client } from "../../../apollo-client";
import { CREATE_NEW_THOUGHT, EDIT_THOUGHT } from "../../../graphql/posts/thoughts";
import { CREATE_NEW_COMMENTARY, EDIT_COMMENTARY } from "../../../graphql/posts/commentaries";
import { CREATE_NEW_QUOTE, EDIT_QUOTE } from "../../../graphql/posts/quotes";

// data
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

// constants
import { DEFAULT_THOUGHT_IMAGE, DEFAULT_COMMENTARY_IMAGE } from "../../../constants/defaults";

export type THandlePostContent = {
   ID?: string;
   title?: string;
   body?: string;
   category_tags?: string;
   referenced_verses?: string[] | string;
   post_image?: string;
   VERSE_ID?: string;
   FOLDER_ID?: string | number;
   is_private?: boolean;
   verse_citation?: string;
   author?: String;
   background?: String;
   sticker?: String;
};

export const dataHandler = async (
   variables: THandlePostContent,
   QUERY: any,
   type: string,
   requestType: string
) => {
   try {
      const { data } = await client.mutate({
         mutation: QUERY,
         variables
      });

      if (data[requestType.toLowerCase()].__typename === type) {
         return { success: notificationMessages.postSuccess };
      } else if (data[requestType.toLowerCase()].__typename === "ExceedsPostCount") {
         return { error: errorMessages.posts.maxPostCount };
      } else if (data[requestType.toLowerCase()].__typename === "NotAuthorized") {
         return { error: { ...errorMessages.auth.pleaseLogin, type: "not_auth" } };
      } else {
         return { error: errorMessages.posts.failToPostCommentary };
      }
   } catch (error: any) {
      console.error(error);
      return { error: errorMessages.posts.failToPostCommentary };
   }
};

export const REQUEST_TYPE_IS_EDIT_COMMENTARY = "edit_commentary"; // pass this to edit or create new post
export const REQUEST_TYPE_IS_NEW_COMMENTARY = "commentary";
export const REQUEST_TYPE_IS_EDIT_THOUGHT = "edit_thought"; // pass this to edit or create new post
export const REQUEST_TYPE_IS_NEW_THOUGHT = "thought";
export const REQUEST_TYPE_IS_EDIT_QUOTE = "edit_quote"; // pass this to edit or create new post
export const REQUEST_TYPE_IS_NEW_QUOTE = "quote";

export const handlePostContent = async (
   variables: THandlePostContent,
   type: string,
   requestType: string
) => {
   let QUERY;
   variables.category_tags = variables
      ? variables.category_tags?.toString().replaceAll(", ", "")
      : "";
   try {
      if (type === "Thought") {
         QUERY = requestType === REQUEST_TYPE_IS_EDIT_THOUGHT ? EDIT_THOUGHT : CREATE_NEW_THOUGHT;

         variables.referenced_verses = variables
            ? variables?.referenced_verses?.toString().replaceAll(", ", "")
            : "";

         if (!variables.post_image) variables.post_image = DEFAULT_THOUGHT_IMAGE;
         if (!variables.category_tags) return { error: errorMessages.posts.missingCategoryTag };
         if (!variables.title) return { error: errorMessages.posts.missingTitle };
         if (!variables.body || variables.body === "")
            return { error: errorMessages.posts.emptyBody };
      } else if (type === "Commentary") {
         QUERY =
            requestType === REQUEST_TYPE_IS_EDIT_COMMENTARY
               ? EDIT_COMMENTARY
               : CREATE_NEW_COMMENTARY;
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
         QUERY = requestType === REQUEST_TYPE_IS_EDIT_QUOTE ? EDIT_QUOTE : CREATE_NEW_QUOTE;

         if (!variables.background) variables.background = "#quote-bkg--0";
         if (!variables.body || variables.body === "")
            return { error: errorMessages.posts.emptyBody };
         if (!variables.category_tags) return { error: errorMessages.posts.missingCategoryTag };
         if (!variables.author) return { error: errorMessages.posts.missingAuthor };
      }

      return await dataHandler(variables, QUERY, type, requestType);
   } catch (error) {
      console.error(error);
   }
};
