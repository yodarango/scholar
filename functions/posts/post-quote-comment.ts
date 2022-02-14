import client from "../../apollo-client";
import { CREATE_QUOTE_COMMENT } from "../../graphql/posts/comments";

const handlePostComment = async (QUOTE_ID: string, body: string) => {
   const data = await client.mutate({
      mutation: CREATE_QUOTE_COMMENT,
      variables: { QUOTE_ID, body }
   });

   let result: boolean;
   data.data.Quote_Comment ? (result = true) : (result = false);
   return result;
};

export default handlePostComment;
