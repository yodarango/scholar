import client from "../../../apollo-client";
import { SHOW_COMMENTS_OF_THOUGHTS } from "../../../graphql/posts/thoughts";

export const handleGetThoughtCommets = async (id: string) => {
   try {
      const { data } = await client.query({
         query: SHOW_COMMENTS_OF_THOUGHTS,
         variables: { ID: id, showComment: true }
      });
      if (data.x) {
         return data.x;
      }

      return "Something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
