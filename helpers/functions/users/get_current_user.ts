import { client } from "../../../apollo-client";
import { GET_CURRENT_USER } from "../../../graphql/users/users";

export const getCurrentUser = async () => {
   try {
      const { data } = await client.query({
         query: GET_CURRENT_USER,
         variables: {}
      });

      if (data && data.get_current_user)
         return {
            data: data.get_current_user,
            status: "done"
         };
      else
         return {
            data: null,
            status: "error"
         };
   } catch (error) {
      console.error(error);
      return {
         data: null,
         status: "error"
      };
   }
};
