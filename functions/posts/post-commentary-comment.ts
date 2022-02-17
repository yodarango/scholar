import client from "../../apollo-client";
import { CREATE_COMMENTARY_COMMENT } from "../../graphql/posts/comments";

const handlePostComment = async (COMMENTARY_ID: string, body: string) => {
   try {
      const data = await client.mutate({
         mutation: CREATE_COMMENTARY_COMMENT,
         variables: { COMMENTARY_ID, body }
      });

      let result: boolean;
      data.data.Commentary_Comment ? (result = true) : (result = false);
      return result;
   } catch (error) {
      return error;
   }
};

export default handlePostComment;
