// graphQl
import { client } from "../../../apollo-client";
import { GET_THOUGHTS, GET_THOUGHT_IN_24 } from "../../../graphql/posts/thoughts";

// fetch data
export const handleGetThoughtIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_THOUGHT_IN_24,
         variables: {}
      });

      if (!data.thought_in_24) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export type TgetThoughtsVariables = {
   ID?: string;
   USER_ID?: string;
   category_tags?: string;
   body?: string;
   last_id?: number | string;
};

export const handleGetThoughts = async (variables: TgetThoughtsVariables) => {
   try {
      const { data } = await client.query({
         query: GET_THOUGHTS,
         variables
      });

      if (!data.thought) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
