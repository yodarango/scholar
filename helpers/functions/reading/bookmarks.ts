// graphQl
import { client } from "../../../apollo-client";
import { GET_BOOKMARKS } from "../../../graphql/reading/read";

export type TBookmarksVariables = {
   ID?: string;
   CHAPTER_ID?: string;
   USER_ID?: number | string;
   last_id: number | string;
};

export const handleGetBookmarks = async (variables: TBookmarksVariables) => {
   try {
      const { data } = await client.query({
         query: GET_BOOKMARKS,
         variables
      });

      if (!data.bookmarks) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
