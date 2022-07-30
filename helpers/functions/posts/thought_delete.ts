import client from "../../../apollo-client";
import { DELETE_ONE_THOUGHT } from "../../../graphql/posts/thoughts";

const handleDeleteThought = async (id: string) => {
   try {
      const { data } = await client.mutate({
         mutation: DELETE_ONE_THOUGHT,
         variables: { ID: id }
      });
      if (data.delete_one_thought) {
         return data.delete_one_thought;
      }
      return "Something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
