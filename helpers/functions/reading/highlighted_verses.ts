// graphQl
import { client } from "../../../apollo-client";
import { GET_HIGHILGHTED_VERSES } from "../../../graphql/reading/highlighted_verses";

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

      if (!data.highlighted_verses) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
