import client from "../../../apollo-client";
import { SHOW_COMMENTS_OF_COMMENTARY } from "../../../graphql/posts/commentaries";

export const getCommentaryCommetns = async (commentary_id: string) => {
   try {
      const { data } = await client.query({
         query: SHOW_COMMENTS_OF_COMMENTARY,
         variables: { ID: commentary_id, showComment: true }
      });
      if (data.commentary) {
         return data.commentary;
      }
      return "Something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
