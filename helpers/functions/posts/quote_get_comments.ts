import client from "../../../apollo-client";
import { OPEN_QUOTE_STORY_COMMENTS } from "../../../graphql/posts/quotes";

export const handleGetQuoteCommetns = async (quote_id: string) => {
   try {
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY_COMMENTS,
         variables: { ID: quote_id, showComment: true }
      });

      if (data.x) {
         return data.x;
      }

      return "Something went wrong!";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
