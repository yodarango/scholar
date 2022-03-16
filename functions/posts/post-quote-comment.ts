import client from "../../apollo-client";
import { CREATE_QUOTE_COMMENT } from "../../graphql/posts/comments";

const handlePostComment = async (QUOTE_ID: string, body: string, USER_ID: string) => {
   try {
      const data = await client.mutate({
         mutation: CREATE_QUOTE_COMMENT,
         variables: { QUOTE_ID, body, USER_ID }
      });

      let result: boolean;
      data.data.Quote_Comment ? (result = true) : (result = false);
      return result;
   } catch (error) {
      return error;
   }
};

export default handlePostComment;
