// core
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

// helpers
import parseJwt from "../../helpers/auth/decodeJWT";
import CheckMediaQuery from "../../helpers/media-query";
const Cookies = require("js-cookie");

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
   gender: string;
   email: string;
   date_registered: string;
   authority_level: string;
   approval_rating: number;
   avatar: string;
   has_new_notifications: boolean;
   my_church: string;
   my_favorite_color: string;
   my_job: string;
   my_true_color_personality_test: string;
   my_story: string;
   my_ministry: string;
   my_favorite_verse: string;
   all_posts: TallPosts;
};

const Me = () => {
   // globals

   // =======================  FUNCTION 1: Get User Settings =============== //
   const [userState, setUserState] = useState<Tuser | null>();
   const [loadingState, setLoadingState] = useState<boolean>(true);

   // set notifications
   const [hasNotificationState, setHasNotificationState] = useState<boolean | undefined>(false);

   const getUserSettings = async () => {
      const { data } = await client.query({
         query: GET_MY_PROFILE,
         variables: {
            totalCountOnly: true,
            getApprovalCount: true,
            from_profile: true
         }
      });

      setHasNotificationState(data.me[0].has_new_notifications);
      if (data.me && data.me.length > 0) {
         setLoadingState(false);
         setUserState(data.me[0]);
      } else if (data.me === null || data.me.length < 0) {
         setLoadingState(false);
         setUserState(null);

         location.href = "/login";
      }
   };

   useEffect(() => {
      getUserSettings();
   }, []);
   // ================  FUNCTION 2: open the notifications popup   ================= //
   const [notificationsPopupState, setnotificationsPopupState] = useState(false);

   const openNotificationsPopup = () => {
      setHasNotificationState(false);
      setnotificationsPopupState(true);
   };

   return (
      <>
         {loadingState && <div>Loading</div>}
         <div className={userStyles.mainWrapper}>
            {notificationsPopupState && (
               <PopupWrapper
                  closeModal={() => setnotificationsPopupState(false)}
                  content={<NotificationsWrapper />}
               />
            )}
            {userState && (
               <div className={userStyles.userBioGrid}>
                  <Header currPage={userState.signature} />
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
            {CheckMediaQuery() < 1000 && <AllContentMobile user={userState} />}
            {CheckMediaQuery() >= 1000 && <AllContentDesktop user={userState} />}
         </div>

         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export default Me;
