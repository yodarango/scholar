// core
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
// graphql
import client from "../../apollo-client";
import { GET_MY_PROFILE } from "../../graphql/users/profile";

// components
import Header from "../../layouts/header";
import AllContentMobile from "../../layouts/home-page-content/mobile/all-content-mobile";
import AllContentDesktop from "../../layouts/home-page-content/desktop/all-content-desktop";
import { Tcommentary } from "../../posts/comment";
import { Tthought } from "../../posts/thought";
import { TsingleStory } from "../../posts/quotes-profile";
import { TsermonPost } from "../../posts/sermon-notes-post";
import UserAboutMe from "../../fragments/chunks/user/user-about-me";
import UserTotalPostsAndRatings from "../../fragments/chunks/user/user-total-posts-ratings";
import UserBioWrapper from "../../fragments/chunks/user/user-bio-wrapper";

import PopupWrapper from "../../layouts/popup-wrapper";
import NotificationsWrapper from "../../fragments/popup-content/notifications-wrapper";
import NavigationMenu from "../../layouts/navigation-menu";

// styles
import userStyles from "../../styles/pages/users/User.module.css";
import cardaLazyloadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// helpers
import CheckMediaQuery from "../../helpers/media-query";
import NewUser from "../../layouts/sudo-pages/new-user";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

export type TallPosts = {
   thought_approval_total_count: number;
   quote_approval_total_count: number;
   commentaries_approval_total_count: number;
   commentaries: Tcommentary[];
   thoughts: Tthought[];
   quotes: TsingleStory[];
   sermon_notes: TsermonPost[];
};

export type Tuser = {
   ID: string;
   MONGO_DB_ID: string;
   signature: string;
   first_name: string;
   last_name: string;
   birth_date: string;
   gender: number;
   email: string;
   date_registered: string;
   authority_level: number;
   approval_rating: number;
   avatar: string;
   has_new_notifications: boolean;
   my_church: string;
   my_favorite_color: string;
   my_job: string;
   my_true_color_personality_test: string;
   my_story: string;
   my_ministry: string;
   first_time_signup: boolean;
   my_favorite_verse: string;
   all_posts: TallPosts;
};

const Me = () => {
   // globals

   // =======================  FUNCTION 1: Get User Settings =============== //
   const [userState, setUserState] = useState<Tuser | null>();
   const [loadingState, setLoadingState] = useState<string>("loading");

   // set notifications
   const [hasNotificationState, setHasNotificationState] = useState<boolean | undefined>(false);

   const getUserSettings = async () => {
      try {
         const { data } = await client.query({
            query: GET_MY_PROFILE,
            variables: {
               totalCountOnly: true,
               getApprovalCount: true
            }
         });

         if (data.me) {
            if (!data.me.user_confirmed) {
               location.href = "/account_verification";
            } else if (data.me.user_confirmed === true) {
               setLoadingState("done");
               setUserState(data.me);
               setHasNotificationState(data.me.has_new_notifications);
            }
         } else if (!data.me) {
            location.href = "/login";
         } else {
            setLoadingState("error");
         }
      } catch (error) {
         setLoadingState("error");
         setUserState(null);
         console.log(error);
      }
   };

   useEffect(() => {
      getUserSettings();
   }, []);
   // ================  FUNCTION 2: open the notifications popup   ================= //
   const [notificationsPopupState, setnotificationsPopupState] = useState(false);

   const openNotificationsPopup = () => {
      document.body.style.overflowY = "hidden";
      setHasNotificationState(false);
      setnotificationsPopupState(true);
   };

   // ================  FUNCTION 3: open the notifications popup   ================= //
   const acceptedIntroTerms = () => {
      if (userState) {
         setUserState({ ...userState, first_time_signup: false });
      }
   };

   return (
      <>
         {notificationsPopupState && (
            <PopupWrapper
               closeModal={() => (
                  (document.body.style.overflowY = "scroll"), setnotificationsPopupState(false)
               )}
               content={<NotificationsWrapper />}
            />
         )}
         {userState && userState.first_time_signup == true && loadingState === "done" && (
            <NewUser acceptedIntroTerms={acceptedIntroTerms} />
         )}
         <Header currPage={"PROFILE"} />
         <div className={userStyles.mainWrapper}>
            {userState && userState.first_time_signup == false && loadingState === "done" && (
               <div className={userStyles.userBioGrid}>
                  <Link href={`/users/settings`}>
                     <a className={userStyles.settingsLinkIcon}></a>
                  </Link>
                  {!hasNotificationState && (
                     <div
                        className={userStyles.notificationBell}
                        onClick={openNotificationsPopup}></div>
                  )}
                  {hasNotificationState && (
                     <div
                        className={userStyles.bellWnotificationWrapper}
                        onClick={openNotificationsPopup}>
                        <div className={userStyles.notificationBellWNotification}></div>
                        <span className={userStyles.notificationSignifier}></span>
                     </div>
                  )}

                  <UserBioWrapper user={userState} />
                  <UserTotalPostsAndRatings user={userState} />
                  <UserAboutMe user={userState} />
               </div>
            )}

            {/* =================== User Content================ */}
            {CheckMediaQuery() < 1000 && userState && loadingState === "done" && (
               <AllContentMobile user={userState} />
            )}
            {CheckMediaQuery() >= 1000 && userState && loadingState === "done" && (
               <AllContentDesktop user={userState} />
            )}
         </div>
         {loadingState === "loading" && (
            <CardsLazyLoading amount={7} compClass={cardaLazyloadingStyles.userProfile} />
         )}
         {loadingState == "error" && (
            <div className={`${cardaLazyloadingStyles.errorImage}`}>
               <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
            </div>
         )}

         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export default Me;
