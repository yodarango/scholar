import { client } from "../../../apollo-client";
import { GET_COMMENTARY_APPROVALS } from "../../../graphql/posts/rating";

export const handleGetCommentaryRatings = async (id: string) => {
   try {
      const { data } = await client.query({
         query: GET_COMMENTARY_APPROVALS,
         variables: {
            COMMENTARY_ID: id
         }
      });

      if (data.commentary_approvals) {
         return data.commentary_approvals;
      }

      return "Something went wrong!";
   } catch (error) {
      console.error(error);
      return "Error";
   }
};
