import { client } from "../../../apollo-client";
import {
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_THOUGHT
} from "../../../constants/defaults";
import { DELETE_ONE_COMMENTARY } from "../../../graphql/posts/commentaries";
import { DELETE_ONE_QUOTE } from "../../../graphql/posts/quotes";
import { DELETE_ONE_THOUGHT } from "../../../graphql/posts/thoughts";
import { EnumContentType } from "../../../types/enums";

export const deleteContent = async (id: string | number, type: EnumContentType) => {
   const CTYPE =
      type === POST_TYPE_COMMENTARY
         ? DELETE_ONE_COMMENTARY
         : type === POST_TYPE_QUOTE
         ? DELETE_ONE_QUOTE
         : DELETE_ONE_THOUGHT;
   try {
      const { data } = await client.mutate({
         mutation: CTYPE,
         variables: { ID: id }
      });

      if (data.delete_one_commentary) return data.delete_one_commentary;
      else if (data.delete_one_quote) return data.delete_one_quote;
      else if (data.delete_one_thought) return data.delete_one_thought;

      return "something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
