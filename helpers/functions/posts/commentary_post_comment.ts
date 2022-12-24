import { client } from "../../../apollo-client";
import { CREATE_COMMENTARY_COMMENT } from "../../../graphql/posts/comments";

// types
import { TCommentary } from "../../../types/posts";

export type ThandlePostComment = {
   POST_ID: string | number;
   USER_ID: string | number;
   body: string;
};

export const postContentComment = async (variables: ThandlePostComment) => {
   try {
      const { data } = await client.mutate({
         mutation: CREATE_COMMENTARY_COMMENT,
         variables
      });
      if (data && data.commentary_comment) {
         return data.commentary_comment;
      }
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
