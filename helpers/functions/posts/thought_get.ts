// graphQl
import { client } from "../../../apollo-client";
import { GET_THOUGHT_IN_24 } from "../../../graphql/posts/thoughts";

// fetch data
export const handleGetThoughtIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_THOUGHT_IN_24,
         variables: {}
      });

      console.log(data);
      if (!data.thought_in_24) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
