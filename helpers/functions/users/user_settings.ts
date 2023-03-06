import { client } from "../../../apollo-client";
import {
   GET_USER_GENERAL_SETTINGS,
   UPDATE_GENERAL_SETTINGS,
   UPDATE_MY_AVATAR
} from "../../../graphql/users/profile";

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

export type ThandleUpdateSettings = {
   my_true_color_personality_test: string;
   my_favorite_verse: string;
   my_favorite_color: string;
   authority_level: number;
   my_ministry: string;
   signature: string;
   my_church: string;
   avatar: string;
   my_job: string;
};

export const handleUpdateGeneralSettings: (variables: ThandleUpdateSettings) => Promise<{
   data: any;
   status: string;
}> = async (variables: ThandleUpdateSettings) => {
   try {
      const { data } = await client.mutate({
         mutation: UPDATE_GENERAL_SETTINGS,
         variables
      });

      if (data.update_general_settings) {
         return { data: data.update_general_settings, status: "done" };
      }
      return { data: null, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export const handleUpdateAvater = async (avatar: string) => {
   try {
      const { data } = await client.mutate({
         mutation: UPDATE_MY_AVATAR,
         variables: { avatar }
      });

      if (data.update_user_avatar) {
         return { data: data.update_user_avatar, status: "done" };
      } else {
         return { data: null, status: "error" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
