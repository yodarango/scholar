import { client } from "../../../apollo-client";
import { GET_POSTS_SUMMARY, GET_USER_NOTIFICATIONS } from "../../../graphql/users/profile";

export type TgetUserNotificationVariables = {
   ID?: string;
   isSelf?: boolean;
   last_id: number | string;
};

export const getUserNotification = async (variables: TgetUserNotificationVariables) => {
   try {
      const { data } = await client.query({
         query: GET_USER_NOTIFICATIONS,
         variables
      });

      if (data && data.notifications)
         return {
            data: data.notifications,
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
