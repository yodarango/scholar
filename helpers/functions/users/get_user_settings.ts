import { client } from "../../../apollo-client";
import { GET_USER_GENERAL_SETTINGS } from "../../../graphql/users/profile";

export const getUserGeneralSettings: () => Promise<any> = async () => {
   try {
      const { data } = await client.query({
         query: GET_USER_GENERAL_SETTINGS,
         variables: {}
      });

      if (data && data.get_user_general_settings)
         return {
            data: data.get_user_general_settings,
            status: "done"
         };
      else
         return {
            data: null,
            status: "error"
         };
   } catch (error) {
      console.error(error);
   }
};
