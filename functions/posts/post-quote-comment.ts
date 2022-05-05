import client from "../../apollo-client";
import { CREATE_QUOTE_COMMENT } from "../../graphql/posts/comments";

const handlePostComment = async (QUOTE_ID: string, body: string, USER_ID: string) => {
   try {
      const { data } = await client.mutate({
         mutation: CREATE_QUOTE_COMMENT,
         variables: { QUOTE_ID, body, USER_ID }
      });

      if (data.Quote_Comment.__typename === "Quote_Comment") {
         return "Quote_Comment";
      }
      if (data.Quote_Comment.__typename === "ExceedsPostCount") {
         return "ExceedsPostCount";
      }
   } catch (error) {
      console.log(error);
      return `Error`;
   }
};

export default handlePostComment;
