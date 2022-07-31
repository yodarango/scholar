import client from "../../../apollo-client";
import { OPEN_QUOTE_STORY } from "../../../graphql/posts/quotes";

export const handleGetQuote = async (user_id: string) => {
   try {
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY,
         variables: { USER_ID: user_id, last_id: null }
      });

      if (data.x) {
         return data;
      }

      return "Something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
