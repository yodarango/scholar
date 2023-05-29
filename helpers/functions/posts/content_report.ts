import { client } from "../../../apollo-client";
import { errorMessages } from "../../../data/error_messages";
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
export const reportCommentary: any = async (
   variables: TreportCommentary,
   type: EnumContentType
) => {
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
      const key = Object.keys(data)[0];

      if (data) {
         if (data[key].__typename === "NotAuthorized") {
            return { error: { ...errorMessages.auth.pleaseLogin, type: "4" } };
         } else {
            return true;
         }
      } else {
         return false;
      }

      // TODO: fix this to return proper data when data is null
   } catch (error) {
      console.error(error);
      return "Error";
   }
};
