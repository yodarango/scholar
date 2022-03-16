import client from "../../apollo-client";
import { CREATE_THOUGHT_COMMENT } from "../../graphql/posts/comments";

const handlePostComment = async (THOUGHT_ID: string, body: string, USER_ID: string) => {
   try {
      const data = await client.mutate({
         mutation: CREATE_THOUGHT_COMMENT,
         variables: { THOUGHT_ID, body, USER_ID }
      });

      let result: boolean;
      data.data.Thought_Comment ? (result = true) : (result = false);
      return result;
   } catch (error) {
      return error;
   }
};

export default handlePostComment;
