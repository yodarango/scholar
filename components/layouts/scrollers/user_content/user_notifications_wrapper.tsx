import { useEffect, useState } from "react";

// components
import { UserNotifications } from "../../../fragments/cards/user_notification";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../../common/feedback/resource_not_found";

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
import { Primary } from "../../../fragments/buttons/primary";
import { Parragraph } from "../../../fragments/Typography/parragraph";

type TUserNotificationsWrapperProps = {
   title: string;
   cta: {
      handleClose: () => void;
   };
};
export const UserNotificationsWrapper = ({ cta, title }: TUserNotificationsWrapperProps) => {
   // state
   const [notifications, setnotifications] = useState<TUserNotification[]>([]);
   const [loading, setloading] = useState("loading");
   const [canLoadMore, setcanLoadMore] = useState<string>("none");

   // get notification
   const getNotifications = async (
      variables: TgetUserNotificationVariables,
      isFetchMore?: boolean
   ) => {
      setcanLoadMore("loading");
      try {
         const { data, status } = await getUserNotification(variables);

         const isloadMore = data && data.length === 25 && status === "done" ? "done" : "none";
         isFetchMore ? setnotifications((prev) => [...prev, ...data]) : setnotifications(data);
         setloading(status);
         setcanLoadMore(isloadMore);
      } catch (error) {
         setnotifications([]);
         setcanLoadMore("error");
         console.error(error);
      }
   };

   useEffect(() => {
      getNotifications({ last_id: NOTIFICATIONS_LAST_ID });
   }, []);

   return (
      <PrimaryStack title={title} cta={{ handleClose: cta.handleClose }}>
         <div className={styles.mainWrapper}>
            {loading === "done" &&
               notifications.length !== 0 &&
               notifications.map((notification: TUserNotification, index: number) => (
                  <div key={index} className={styles.notification}>
                     <UserNotifications
                        ID={notification.ID}
                        body={notification.body}
                        postId={notification.POST_ID}
                        postType={notification.CONTENT_TYPE}
                        isOpen={notification.read_date}
                     />
                  </div>
               ))}

            {notifications.length === 0 && (
               <>
                  <div className={styles.noNotifications}>{/* #NEEDS GRAPHICS */}</div>
                  <div className={styles.noNotificationsText}>
                     <Parragraph quiet text='Nothing here yet!' size='xlarge' bold />
                  </div>
               </>
            )}
            {canLoadMore === "done" && (
               <div className={styles.loadMore}>
                  <Primary
                     title='Load more'
                     type='1'
                     cta={{
                        handleClick: () =>
                           getNotifications(
                              { last_id: notifications[notifications.length - 1].ID },
                              true
                           )
                     }}
                  />
               </div>
            )}
            {canLoadMore === "loading" && (
               <div className={styles.loadMore}>
                  <RoundLoader />
               </div>
            )}

            {/* loader */}
            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
            {/* error */}
            {loading === "error" && <div className={styles.error}>{/* #NEEDS GRAPHICS */}</div>}
         </div>
      </PrimaryStack>
   );
};
