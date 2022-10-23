// graphQl
import { client } from "../../../apollo-client";
import { GET_COMMENTARIES_IN_24 } from "../../../graphql/posts/commentaries";

// fetch data
export const handleGetCommentariesIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_COMMENTARIES_IN_24,
         variables: {}
      });

      if (!data.commentary_in_24) {
         return { data: null, status: "error" };
      }

      console.log(data);

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
