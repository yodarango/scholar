import { client } from "../../../apollo-client";
import { GET_QUOTE_APPROVALS } from "../../../graphql/posts/rating";

export const handleGetQuoteRating = async (id: string) => {
   try {
      const { data } = await client.query({
         query: GET_QUOTE_APPROVALS,
         variables: {
            QUOTE_ID: id
         }
      });
      if (data.x) {
         return data.x;
      }
      return "Something went wrong";
   } catch (error) {
      console.error(error);
      return "Error";
   }
};
