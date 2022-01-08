import client from "../../apollo-client";
import { CREATE_THOUGHT_COMMENT } from "../../graphql/posts/comments";

const handlePostComment = async (THOUGHT_ID: string, USER_ID: string, body: string) => {
   const data = await client.mutate({
      mutation: CREATE_THOUGHT_COMMENT,
      variables: { THOUGHT_ID, USER_ID, body }
   });

   let result: boolean;
   data.data.Thought_Comment ? (result = true) : (result = false);
   return result;
};

export default handlePostComment;
