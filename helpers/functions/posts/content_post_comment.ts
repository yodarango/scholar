import { client } from "../../../apollo-client";
import {
   CREATE_COMMENTARY_COMMENT,
   CREATE_QUOTE_COMMENT,
   CREATE_ARTICLE_COMMENT
} from "../../../graphql/posts/comments";

// types
import { EnumContentType } from "../../../types/enums";

export type ThandlePostComment = {
   ID?: string | null;
   POST_ID: string | number;
   USER_ID: string | number;
   body: string;
};

export const postContentComment = async (
   variables: ThandlePostComment,
   contentType: EnumContentType
) => {
   const CONTENT =
      contentType === 1
         ? CREATE_COMMENTARY_COMMENT
         : contentType === 2
         ? CREATE_QUOTE_COMMENT
         : CREATE_ARTICLE_COMMENT;
   try {
      const { data } = await client.mutate({
         mutation: CONTENT,
         variables
      });
      if (data && data.commentary_comment) return data.commentary_comment;
      else if (data && data.thought_comment) return data.thought_comment;
      else if (data && data.quote_comment) return data.quote_comment;
   } catch (error) {
      console.error(error);
      return "Error";
   }
};
