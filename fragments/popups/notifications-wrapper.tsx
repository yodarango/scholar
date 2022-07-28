// core
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// graphql
import client from "../../apollo-client";
import { GET_MY_NOTIFICATIONS } from "../../graphql/users/notifications";

// components
import SmallLoader from "../chunks/small_loader";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../chunks/error_resource_not_found";

// styles
import notificationsWrapperStyles from "../../styles/fragments/popup-content/NotificationWrapper.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

const NotificationsWrapper = () => {
   // ==============FUNCTION 1:    fetch all the notifications by user   =============== //
   type Tnotification = {
      ID: number;
      USER_ID: number;
      POST_ID: number;
      CONTENT_TYPE: number;
      posted_on: string;
      body: string;
      icon: string;
      color: string;
      type: string;
      date?: Date;
   };

   const [notificationsState, setNotificationsState] = useState<Tnotification[]>([]);
   const [lastnotificationFetchCount, setLastnotificationFetchCount] = useState<number>();
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   const fetchNotifications = async (last_id: number) => {
      try {
         const { data } = await client.query({
            query: GET_MY_NOTIFICATIONS,
            variables: { last_id: last_id }
         });
         setLastnotificationFetchCount(data.notifications.length);
         setNotificationsState(data.notifications);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
      }
   };

   useEffect(() => {
      fetchNotifications(999999999);
   }, []);

   // ==================== Fetch more notifications
   const fetchMoreNotifications = async (last_id: string) => {
      setSmallLoaderState(true);
      try {
         const { data } = await client.query({
            query: GET_MY_NOTIFICATIONS,
            variables: { last_id: parseInt(last_id) }
         });
         setLastnotificationFetchCount(data.notifications.length);
         setNotificationsState((notificationsState) => [
            ...notificationsState,
            ...data.notifications
         ]);
         setSmallLoaderState(false);
      } catch (error) {
         console.log(error);
         setLoadingState("error");
         setSmallLoaderState(false);
      }
   };

   return (
      <div className={notificationsWrapperStyles.mainWrapper}>
         <p className={`${notificationsWrapperStyles.notificationDisclaimer} std-text-block`}>
            (All notifications are deleted after 48 hours)
         </p>
         {notificationsState &&
            loadingState === "done" &&
            notificationsState.map((notification: Tnotification) => (
               <Link href={"#"} key={notification.ID}>
                  <a
                     className={notificationsWrapperStyles.notificationWrapper}
                     style={{ borderLeft: `.5rem solid ${notification.color}` }}>
                     {notification.posted_on && (
                        <p className={notificationsWrapperStyles.notificationDate}>
                           {` ${notification.posted_on.split(":")[0]} ${
                              notification.posted_on.split(":")[1]
                           } `}
                        </p>
                     )}
                     {notification.CONTENT_TYPE === 1 && (
                        <div
                           className={`${notificationsWrapperStyles.icon} ${notificationsWrapperStyles.iconCommentary} std-vector-icon`}></div>
                     )}
                     {notification.CONTENT_TYPE === 2 && (
                        <div
                           className={`${notificationsWrapperStyles.icon} ${notificationsWrapperStyles.iconQuote} std-vector-icon`}></div>
                     )}
                     {notification.CONTENT_TYPE === 3 && (
                        <div
                           className={`${notificationsWrapperStyles.icon} ${notificationsWrapperStyles.iconThought} std-vector-icon`}></div>
                     )}
                     {notification.CONTENT_TYPE === 5 && (
                        <div
                           className={`${notificationsWrapperStyles.icon} ${notificationsWrapperStyles.iconThought} std-vector-icon`}></div>
                     )}
                     <p className={notificationsWrapperStyles.content}>{notification.body}</p>
                  </a>
               </Link>
            ))}
         {lastnotificationFetchCount == 25 && !smallLoaderState && (
            <button
               className={`std-button`}
               onClick={() =>
                  fetchMoreNotifications(
                     notificationsState[notificationsState.length - 1].ID.toString()
                  )
               }>
               <p className={`std-button_gradient-text`}>Load More</p>
            </button>
         )}
         {lastnotificationFetchCount == 25 && !smallLoaderState && <SmallLoader />}
         {notificationsState.length === 0 && (
            <h2 className={notificationsWrapperStyles.noNotifications}>
               You have 0 notifications!
            </h2>
         )}
         {loadingState === "loading" && (
            <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.userNotifications} />
         )}
         {loadingState == "error" && <ResourceNotFoundError />}
      </div>
   );
};

export default NotificationsWrapper;
