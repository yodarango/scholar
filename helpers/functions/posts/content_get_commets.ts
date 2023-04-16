import { client } from "../../../apollo-client";
import {
   GET_COMMENTARY_COMMENTS,
   GET_QUOTE_COMMENTS,
   GET_THOUGHT_COMMENTS
} from "../../../graphql/posts/comments";
import { EnumContentType } from "../../../types/enums";

export type TgetPostComments = {
   ID?: string;
   USER_ID?: string | number;
   COMMENTARY_ID?: string | number;
   QUOTE_ID?: string | number;
   THOUGHT_ID?: string | number;
   POST_ID?: string | number;
   last_id?: string | number;
};
export const getPostComments = async (
   variables: TgetPostComments,
   contentType: EnumContentType
) => {
   let CTYPE;
   if (contentType === 1) {
      CTYPE = GET_COMMENTARY_COMMENTS;
      variables.COMMENTARY_ID = variables.POST_ID;
   } else if (contentType === 2) {
      CTYPE = GET_QUOTE_COMMENTS;
      variables.QUOTE_ID = variables.POST_ID;
   } else {
      CTYPE = GET_THOUGHT_COMMENTS;
      variables.THOUGHT_ID = variables.POST_ID;
   }

   try {
      const { data } = await client.query({
         query: CTYPE,
         variables
      });
      if (data.commentary_comments) return { data: data.commentary_comments, status: "done" };
      else if (data.quote_comments) return { data: data.quote_comments, status: "done" };
      else if (data.thought_comments) return { data: data.thought_comments, status: "done" };
      return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
