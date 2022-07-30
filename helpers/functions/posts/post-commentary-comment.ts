import client from "../../../apollo-client";
import { CREATE_COMMENTARY_COMMENT } from "../../../graphql/posts/comments";

// types
import { Tcomment } from "../../../fragments/buttons/post-reactions";

const handlePostComment = async (COMMENTARY_ID: string, body: string, USER_ID: string) => {
   try {
      const { data } = await client.mutate({
         mutation: CREATE_COMMENTARY_COMMENT,
         variables: { COMMENTARY_ID, body, USER_ID }
      });

      let result: boolean | Tcomment;
      data.Commentary_Comment ? (result = data.Commentary_Comment) : (result = false);
      return result;
   } catch (error) {
      console.log(error);
      return "Error";
   }
};

export default handlePostComment;
