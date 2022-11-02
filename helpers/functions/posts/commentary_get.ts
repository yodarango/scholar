// graphQl
import { client } from "../../../apollo-client";
import { GET_COMMENTARIES_IN_24, GET_COMMENTARIES } from "../../../graphql/posts/commentaries";

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

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export type TgetcommentariesVariables = {
   ID?: string | number;
   USER_ID?: string;
   VERSE_ID?: string;
   AUTHORITY_LEVEL?: string;
   body?: string;
   category_tags?: string;
   last_id: string | number;
};

export const handleGetCommentaries = async (variables: TgetcommentariesVariables) => {
   try {
      const { data } = await client.query({
         query: GET_COMMENTARIES,
         variables
      });

      if (!data.commentary) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
