import { client } from "../../../apollo-client";
import { GET_POSTS_SUMMARY } from "../../../graphql/users/profile";

export type TgetPostsSummaryVariables = {
   ID?: string;
};

export const getPostsSummary = async (variables?: TgetPostsSummaryVariables) => {
   try {
      const { data } = await client.query({
         query: GET_POSTS_SUMMARY,
         variables
      });

      if (data && data.get_posts_summary)
         return {
            data: data.get_posts_summary,
            status: "done"
         };
      else
         return {
            data: null,
            status: "error"
         };
   } catch (error) {
      console.error(error);
      return {
         data: null,
         status: "error"
      };
   }
};
