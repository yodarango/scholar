// core
import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// graphql
import client from "../../apollo-client";
import { GET_USER_PROFILE } from "../../graphql/users/profile";

// components
import Header from "../../layouts/header";
import AllContentMobile from "../../layouts/home-page-content/mobile/all-content-mobile";
import AllContentDesktop from "../../layouts/home-page-content/desktop/all-content-desktop";
//-----------------------
import PopupWrapper from "../../layouts/popup-wrapper";
import NotificationsWrapper from "../../fragments/popup-content/notifications-wrapper";
import NavigationMenu from "../../layouts/navigation-menu";

// styles
import userStyles from "../../styles/pages/users/User.module.css";

// helpers
import { Tcommentary } from "../../posts/comment";
import { Tthought } from "../../posts/thought";
import { TsingleStory } from "../../posts/quotes-profile";
import { TsermonPost } from "../../posts/sermon-notes-post";
import CheckMediaQuery from "../../helpers/media-query";
import UserAboutMe from "../../fragments/chunks/user/user-about-me";
import UserTotalPostsAndRatings from "../../fragments/chunks/user/user-total-posts-ratings";
import UserBioWrapper from "../../fragments/chunks/user/user-bio-wrapper";

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
   my_church: string;
   my_favorite_color: string;
   my_job: string;
   my_true_color_personality_test: string;
   my_story: string;
   my_ministry: string;
   my_favorite_verse: string;
   all_posts: TallPosts;
};

export type userProps = {
   user: Tuser;
};

const User = ({ user }: userProps) => {
   const router = useRouter();
   const userId = router.query?.userId ? router.query.userId[0] : null;

   // =======================  FUNCTION 1: Get User Settings =============== //
   const [userSettingsState, setUserSettingsState] = useState<Tuser>();
   const getUserSettings = async () => {
      const { loading, error, data } = await client.query({
         query: GET_USER_PROFILE,
         variables: {
            ID: userId,
            totalCountOnly: true,
            getApprovalCount: true
         }
      });
      if (data.users && data.users.length > 0) {
         setUserSettingsState(data.users[0]);
      }
      console.log(error, loading, data);
   };
   useEffect(() => {
      getUserSettings();
   }, []);

   return (
      <>
         {false && (
            <div className={userStyles.mainWrapper}>
               <div className={userStyles.userBioGrid}>
                  <Header currPage={user.signature} />

                  {user.approval_rating > 100 && (
                     <div className={userStyles.bellWnotificationWrapper}>
                        <div className={userStyles.notificationBellWNotification}></div>
                        <span className={userStyles.notificationSignifier}></span>
                     </div>
                  )}

                  <UserBioWrapper user={user} />
                  <UserTotalPostsAndRatings user={user} />
                  <UserAboutMe user={user} />
               </div>
               {/* =================== User Content================ */}
               {CheckMediaQuery() < 1000 && <AllContentMobile user={user} />}
               {CheckMediaQuery() >= 1000 && <AllContentDesktop user={user} />}
            </div>
         )}
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//    let userId = context.params && context.params.userId ? context.params.userId[0] : 20;

//    const { data } = await client.query({
//       query: GET_PROFILE_INFO,
//       variables: { ID: userId, totalCountOnly: true, getApprovalCount: true }
//    });

//    console.log(userId);

//    return {
//       props: {
//          user: data.users[0]
//       }
//    };
// };

export default User;
