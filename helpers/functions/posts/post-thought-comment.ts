import client from "../../../apollo-client";
import { CREATE_THOUGHT_COMMENT } from "../../../graphql/posts/comments";

// types
import { Tcomment } from "../../../fragments/buttons/post-reactions";

const handlePostComment = async (THOUGHT_ID: string, body: string, USER_ID: string) => {
   try {
      const { data } = await client.mutate({
         mutation: CREATE_THOUGHT_COMMENT,
         variables: { THOUGHT_ID, body, USER_ID }
      });

      let result: boolean | Tcomment;
      data.Thought_Comment ? (result = data.Thought_Comment) : (result = false);
      return result;
   } catch (error) {
      console.log(error);
      return `Error`;
   }
};

export default handlePostComment;
