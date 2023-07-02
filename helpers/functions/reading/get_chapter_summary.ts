import { client } from "../../../apollo-client";
import { GET_CHAPTER_SUMMARY } from "../../../graphql/reading/read";

export const getChapterSummary = async (CHAPTER_ID: string) => {
   try {
      const { data } = await client.query({
         query: GET_CHAPTER_SUMMARY,
         variables: { CHAPTER_ID }
      });
      if (data?.get_chapter_summary)
         return { data: data?.get_chapter_summary, error: null, status: "done" };
      else {
         return {
            data: null,
            error: "Unable to get chapter summary",
            status: "error"
         };
      }
   } catch (error) {
      console.error(error);
      return {
         data: null,
         error: error,
         status: "error"
      };
   }
};
