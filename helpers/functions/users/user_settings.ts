import { client } from "../../../apollo-client";
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";
import {
   GET_USER_GENERAL_SETTINGS,
   GET_USER_PREFERENCE_SETTINGS,
   GET_USER_PRIVACY_SETTINGS,
   UPDATE_GENERAL_SETTINGS,
   UPDATE_MY_AVATAR,
   UPDATE_MY_EMAIL,
   UPDATE_MY_SIGNATURE,
   UPDATE_PREFERENCE_SETTINGS,
   UPDATE_PRIVACY_SETTINGS
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
      return {
         data: null,
         status: "error"
      };
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

export const handleUpdateSignature = async (signature: string): Promise<any> => {
   try {
      const { data } = await client.mutate({
         mutation: UPDATE_MY_SIGNATURE,
         variables: { signature }
      });

      if (data.update_signature?.__typename === "User") {
         return {
            data: data.update_signature,
            status: "done",
            title: notificationMessages.signatureSaved.title,
            body: notificationMessages.signatureSaved.body,
            type: "2"
         };
      } else if (data.update_signature?.__typename === "SignatureAlreadyTaken") {
         return {
            data: null,
            status: "error",
            title: errorMessages.account.signatureAlreadyExists.title,
            body: errorMessages.account.signatureAlreadyExists.body,
            type: "4"
         };
      }
   } catch (error) {
      console.error(error);
      return {
         data: null,
         status: "error",
         title: errorMessages.account.unableToUpdateSignature.title,
         body: errorMessages.account.unableToUpdateSignature.body,
         type: "4"
      };
   }
};

export const getUserPrivacySettings: () => Promise<any> = async () => {
   try {
      const { data } = await client.query({
         query: GET_USER_PRIVACY_SETTINGS,
         variables: {}
      });

      if (data && data.get_user_privacy_settings)
         return {
            data: data.get_user_privacy_settings,
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
export const getUserPreferenceSettings: () => Promise<any> = async () => {
   try {
      const { data } = await client.query({
         query: GET_USER_PREFERENCE_SETTINGS,
         variables: {}
      });

      if (data && data.get_user_preference_settings)
         return {
            data: data.get_user_preference_settings,
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

type ThandleUpdatePrivacySettings = {
   birth_date: string;
   first_name: string;
   last_name: string;
   gender: boolean;
};
export const handleUpdatePrivacySettings = async (variables: ThandleUpdatePrivacySettings) => {
   try {
      const { data } = await client.mutate({
         mutation: UPDATE_PRIVACY_SETTINGS,
         variables
      });

      if (data.update_privacy_settings.update_successful) {
         return { data: data.update_privacy_settings.update_successful, status: "done" };
      }
      return { data: null, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

type ThandleUpdatePreferencesSettings = {
   is_Bible_public: boolean;
};
export const handleUpdatePreferencesSettings = async (
   variables: ThandleUpdatePreferencesSettings
) => {
   try {
      const { data } = await client.mutate({
         mutation: UPDATE_PREFERENCE_SETTINGS,
         variables
      });
      {
         if (data.update_preference_settings.update_successful) {
            return { data: data.update_preference_settings.update_successful, status: "done" };
         }
      }
      return { data: false, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export const handleUpdateEmail = async (email: string): Promise<any> => {
   try {
      const { data } = await client.mutate({
         mutation: UPDATE_MY_EMAIL,
         variables: { email }
      });

      if (data.update_email?.__typename === "User") {
         return {
            data: data.update_email,
            status: "done",
            title: notificationMessages.emailSaved.title,
            body: notificationMessages.emailSaved.body,
            type: "2"
         };
      } else if (data.update_email?.__typename === "EmailExists") {
         return {
            data: null,
            status: "error",
            title: errorMessages.account.emailAlreadyExists.title,
            body: errorMessages.account.emailAlreadyExists.body,
            type: "4"
         };
      }
   } catch (error) {
      console.error(error);
      return {
         data: null,
         status: "error",
         title: errorMessages.account.unableToUpdateSignature.title,
         body: errorMessages.account.unableToUpdateSignature.body,
         type: "4"
      };
   }
};
