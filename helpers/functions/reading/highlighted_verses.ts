// graphQl
import { client } from "../../../apollo-client";
import { errorMessages } from "../../../data/error_messages";
import {
   GET_HIGHILGHTED_VERSES,
   POST_HIGHILGHTED_VERSES,
   REMOVE_HIGHILGHTED_VERSE
} from "../../../graphql/reading/read";

export type ThighlightedVersesVariables = {
   ID?: string;
   VERSE_ID?: string;
   USER_ID?: number | string | null;
   last_id: number | string;
};

//! i might be able to delete this function, check later #DELETE
export const handleGetHighilightedVerses = async (variables: ThighlightedVersesVariables) => {
   try {
      const { data } = await client.query({
         query: GET_HIGHILGHTED_VERSES,
         variables
      });

      if (!data.highlighted_verses) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export type ThandlePostHighlight = {
   VERSE_ID: string | number;
   highlight_type: number;
   color: string;
};

export const handlePostHighlight = async (variables: ThandlePostHighlight) => {
   try {
      const { data } = await client.query({
         query: POST_HIGHILGHTED_VERSES,
         variables
      });

      if (data) {
         if (data.new_highlighted_verse.__typename === "Highlight") {
            return { data: data.new_highlighted_verse, error: null, status: "done" };
         } else if (data.new_highlighted_verse.__typename === "NotAuthorized") {
            return {
               error: { ...errorMessages.auth.pleaseLogin, type: "4" },
               data: null,
               status: "not_auth"
            };
         }
      } else {
         return { data: null, error: null, status: "error" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error", error: error };
   }
};

export const handleRemoveHighlight = async (VERSE_ID: string | number) => {
   try {
      const { data } = await client.query({
         query: REMOVE_HIGHILGHTED_VERSE,
         variables: { VERSE_ID }
      });

      if (data) {
         if (data.remove_highlighted_verse.__typename === "Highlight") {
            return { data: data.remove_highlighted_verse, error: null, status: "done" };
         } else if (data.remove_highlighted_verse.__typename === "NotAuthorized") {
            return {
               error: { ...errorMessages.auth.pleaseLogin, type: "4" },
               data: null,
               status: "not_auth"
            };
         }
      } else {
         return { data: null, error: null, status: "error" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error", error: error };
   }
};
