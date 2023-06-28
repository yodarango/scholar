import { client } from "../../../apollo-client";
import { IS_FIRST_TIME_SIGN_UP } from "../../../graphql/users/users";

export const getIsFirstTimeSignUp = async () => {
   try {
      const { data } = await client.query({
         query: IS_FIRST_TIME_SIGN_UP,
         variables: {}
      });

      if (data)
         return {
            data: data.is_first_time_sign_up,
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
