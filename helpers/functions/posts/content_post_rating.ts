import { RATE_COMMENT, RATE_QUOTE, RATE_THOUGHT } from "../../../graphql/posts/rating";
import { client } from "../../../apollo-client";

// type
import { EnumContentType } from "../../../types/enums";

export type TrateContent = {
   POST_ID: number | string;
   USER_ID: number | string;
   rating: number;
};
export const rateContent = async (variables: TrateContent, contentType: EnumContentType) => {
   const RATE_CONTENT =
      contentType === 1 ? RATE_COMMENT : contentType === 2 ? RATE_QUOTE : RATE_THOUGHT;
   try {
      const { data } = await client.mutate({
         mutation: RATE_CONTENT,
         variables
      });

      if (data) {
         return { data, status: "done" };
      }
      return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
