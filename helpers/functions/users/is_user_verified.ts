import { IS_USER_VERIFIED } from "../../../graphql/users/users";
import { client } from "../../../apollo-client";

export const isUserVerified = async () => {
   try {
      const { data } = await client.query({
         query: IS_USER_VERIFIED,
         variables: {}
      });

      if (data)
         return {
            data: data.is_user_verified,
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
