import client from "../../../apollo-client";
import { DELETE_ONE_COMMENTARY } from "../../../graphql/posts/commentaries";

export const handleDeleteCommentary = async (id: string) => {
   try {
      const { data } = await client.mutate({
         mutation: DELETE_ONE_COMMENTARY,
         variables: { ID: id }
      });
      if (data.delete_one_commentary) {
         return data.delete_one_commentary;
      }
      return "something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
