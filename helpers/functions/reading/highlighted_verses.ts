// graphQl
import { client } from "../../../apollo-client";
import { GET_HIGHILGHTED_VERSES, POST_HIGHILGHTED_VERSES } from "../../../graphql/reading/read";

export type ThighlightedVersesVariables = {
   ID?: string;
   VERSE_ID?: string;
   USER_ID?: number | string;
   last_id: number | string;
};

export const handleGetHighilightedVerses = async (variables: ThighlightedVersesVariables) => {
   try {
      const { data } = await client.query({
         query: GET_HIGHILGHTED_VERSES,
         variables
      });

      console.log(data);

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

      console.log(data);
      if (!data.new_highlighted_verse) {
         return { data: null, status: "error" };
      }

      return { data: data.new_highlighted_verse, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
