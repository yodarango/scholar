import { client } from "../../../apollo-client";
import { GET_USER_ABOUT_ME } from "../../../graphql/users/profile";

export type TgetUserAboutMeVariables = { isSelf?: boolean; ID?: string };
export const getUserAboutMe = async (variables: TgetUserAboutMeVariables) => {
   try {
      const { data } = await client.query({
         query: GET_USER_ABOUT_ME,
         variables
      });

      if (data && data.get_user_about_me)
         return {
            data: data.get_user_about_me,
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
