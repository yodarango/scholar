import { client } from "../../../apollo-client";
import { GET_HIGHILGHTED_VERSES } from "../../../graphql/reading/read";
import { ThighlightedVersesVariables } from "./highlighted_verses";

export const useGetChapterData = async (variables: ThighlightedVersesVariables) => {
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
