import { useEffect, useState } from "react";

// components
import { UserNotifications } from "../../../fragments/cards/user_notification";

// styles
import styles from "./user_notifications_wrapper.module.css";

// types
import { TUserNotification } from "../../../../types/account";
import { PrimaryStack } from "../../stacks/templates/primary_stack";
import {
   getUserNotification,
   TgetUserNotificationVariables
} from "../../../../helpers/functions/users/get_user_notification";
import { NOTIFICATIONS_LAST_ID } from "../../../../constants/defaults";

type TUserNotificationsWrapperProps = {
   userID?: string;
   title: string;
   cta: {
      handleClose: () => void;
   };
};
export const UserNotificationsWrapper = ({
   cta,
   title,
   userID
}: TUserNotificationsWrapperProps) => {
   // state
   const [notifications, setnotifications] = useState<TUserNotification[]>([
      { ID: "2343", body: "abc", postId: "2343", postType: 0 },
      { ID: "2343", body: "abc", postId: "2343", postType: 1 },
      { ID: "2343", body: "abc", postId: "2343", postType: 2 },
      { ID: "2343", body: "abc", postId: "2343", postType: 3 }
   ]);

   // get notification
   const getNotifications = async (variables: TgetUserNotificationVariables) => {
      try {
         const { data } = await getUserNotification(variables);
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (!userID) {
         getNotifications({ isSelf: true, last_id: NOTIFICATIONS_LAST_ID });
      } else {
         getNotifications({ last_id: NOTIFICATIONS_LAST_ID });
      }
   }, []);

   return (
      <PrimaryStack title={title} cta={{ handleClose: cta.handleClose }}>
         <div className={styles.mainWrapper}>
            {notifications.map((notification: TUserNotification, index: number) => (
               <div key={index} className={styles.notification}>
                  <UserNotifications
                     ID={notification.ID}
                     body={notification.body}
                     postId={notification.postId}
                     postType={notification.postType}
                  />
               </div>
            ))}
         </div>
      </PrimaryStack>
   );
};
