import { CONTENT_RATING } from "../../../graphql/posts/rating";
import { client } from "../../../apollo-client";

export type TrateContent = {
   COMMENTARY_ID: number | string;
   rating: number;
   USER_ID: number | string;
};
export const rateContent = async (variables: TrateContent) => {
   try {
      const { data } = await client.mutate({
         mutation: CONTENT_RATING,
         variables
      });
      console.log(data);
      if (data) {
         return { data, status: "done" };
      }
      return { data: null, status: "error" };
   } catch (error) {
      console.log(error);
      return { data: null, status: "error" };
   }
};
