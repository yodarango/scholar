import { client } from "../../../apollo-client";
import {
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_ARTICLE
} from "../../../constants/defaults";
import { DELETE_COMMENTARY_COMMENT } from "../../../graphql/posts/comments";
import { DELETE_QUOTE_COMMENT } from "../../../graphql/posts/comments";
import { DELETE_ARTICLE_COMMENT } from "../../../graphql/posts/comments";
import { EnumContentType } from "../../../types/enums";

export const deleteContentComment = async (id: string | number, type: EnumContentType) => {
   const CTYPE =
      type === POST_TYPE_COMMENTARY
         ? DELETE_COMMENTARY_COMMENT
         : type === POST_TYPE_QUOTE
         ? DELETE_QUOTE_COMMENT
         : DELETE_ARTICLE_COMMENT;
   try {
      const { data } = await client.mutate({
         mutation: CTYPE,
         variables: { ID: id }
      });
      if (data.delete_commentary_comment) return data.delete_commentary_comment;
      else if (data.delete_quote_comment) return data.delete_quote_comment;
      else if (data.delete_article_comment) return data.delete_article_comment;
      return "something went wrong";
   } catch (error) {
      console.error(error);
      return "Error";
   }
};
