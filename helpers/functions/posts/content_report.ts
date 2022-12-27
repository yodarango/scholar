import { client } from "../../../apollo-client";
import {
   REPORT_COMMENTARY,
   REPORT_QUOTE,
   REPORT_SERMON_NOTE,
   REPORT_THOUGHT
} from "../../../graphql/posts/reporting";
import { EnumContentType } from "../../../types/enums";

export type TreportCommentary = {
   USER_ID: string;
   POST_ID: string;
};
export const reportCommentary = async (variables: TreportCommentary, type: EnumContentType) => {
   const CONTENT =
      type === 1
         ? REPORT_COMMENTARY
         : type === 2
         ? REPORT_QUOTE
         : type === 3
         ? REPORT_THOUGHT
         : REPORT_SERMON_NOTE;
   try {
      const { data } = await client.mutate({
         mutation: CONTENT,
         variables
      });

      if (data.report_commentary) return data.report_commentary;
      else if (data.report_quote) return data.report_quote;
      else if (data.report_thought) return data.report_thought;
      else if (data.report_sermon_note) return data.report_sermon_note;

      return false;
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
