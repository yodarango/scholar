// --------------- CAN DELETE ---------------

// // core
// import { useState, useEffect } from "react";
// //import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import HeadContent from "../../layouts/head-content";
// import Image from "next/image";

// // graphql
// import client from "../../apollo-client";
// import { GET_USER_PROFILE } from "../../graphql/users/profile";

// // components
// import Header from "../../layouts/header";
// import AllContentMobile from "../../layouts/home-page-content/mobile/all-content-mobile";
// import AllContentDesktop from "../../layouts/home-page-content/desktop/all-content-desktop";
// //-----------------------
// import PopupWrapper from "../../layouts/popup-wrapper";
// import NotificationsWrapper from "../../fragments/popup-content/notifications-wrapper";
// import NavigationMenu from "../../layouts/navigation-menu";
// import UserAboutMe from "../../fragments/chunks/user/user-about-me";
// import UserTotalPostsAndRatings from "../../fragments/chunks/user/user-total-posts-ratings";
// import UserBioWrapper from "../../fragments/chunks/user/user-bio-wrapper";
// import CardsLazyLoading from "../../layouts/cards-lazy-loading";
// import ResourceNotFoundError from "../../layouts/resource-not-found-error";

// // styles
// import userStyles from "../../styles/pages/users/User.module.css";
// import cardaLazyloadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// // helpers
// import CheckMediaQuery from "../../helpers/media-query";

// //types
// import { Tcommentary } from "../../posts/comment";
// import { Tthought } from "../../posts/thought";
// import { TsingleStory } from "../../posts/quotes-profile";
// import { TsermonPost } from "../../posts/sermon-notes-post";
// import { loggedInUser } from "../../helpers/auth/get-loggedin-user";

// export type TallPosts = {
//    thought_approval_total_count: number;
//    quote_approval_total_count: number;
//    commentaries_approval_total_count: number;
//    commentaries: Tcommentary[];
//    thoughts: Tthought[];
//    quotes: TsingleStory[];
//    sermon_notes: TsermonPost[];
// };

// export type Tuser = {
//    ID: string;
//    MONGO_DB_ID: string;
//    signature: string;
//    first_name: string;
//    last_name: string;
//    birth_date: string;
//    gender: number;
//    email: string;
//    date_registered: string;
//    authority_level: number;
//    approval_rating: number;
//    avatar: string;
//    is_patron?: boolean;
//    my_church: string;
//    my_favorite_color: string;
//    my_job: string;
//    my_true_color_personality_test: string;
//    my_story: string;
//    my_ministry: string;
//    my_favorite_verse: string;
//    all_posts: TallPosts;
//    all_posts_profile?: TallPosts;
// };

// const User = () => {
//    const router = useRouter();
//    const userId = router.query?.userId ? router.query.userId : "";

//    // =======================  FUNCTION 1: Get User Settings =============== //
//    const [userState, setUserState] = useState<Tuser | null>();
//    const [loadingState, setLoadingState] = useState<string>("loading");

//    const getUserProfile = async () => {
//       // =================== Check if there is a Logged in user and fetch its data ========== /
//       const authJWT = loggedInUser();
//       const parsedUserId = authJWT?.ID ? authJWT.ID : null;

//       try {
//          const { data } = await client.query({
//             query: GET_USER_PROFILE,
//             variables: {
//                ID: userId,
//                totalCountOnly: true,
//                getApprovalCount: true
//             }
//          });

//          if (data.users && data.users.length > 0) {
//             if (data.users[0].ID == parsedUserId) {
//                router.replace("/users/me");
//             } else {
//                setLoadingState("done");
//                setUserState(data.users[0]);
//             }
//          } else if (data.users === null || data.users.length === 0) {
//             setLoadingState("error");
//             setUserState(null);
//          }
//       } catch (error) {
//          setLoadingState("error");
//          setUserState(null);
//          console.log(error);
//       }
//    };

//    useEffect(() => {
//       if (router.isReady) {
//          getUserProfile();
//       }
//    }, [router.query]);

//    return (
//       <>
//          <Head>
//             <HeadContent />
//          </Head>
//          <Header currPage={userState?.signature ? userState.signature : "loading"} />
//          <div className={userStyles.mainWrapper}>
//             {userState && loadingState === "done" && (
//                <div className={userStyles.userBioGrid}>
//                   <UserBioWrapper user={userState} />
//                   <UserTotalPostsAndRatings user={userState} />
//                   <UserAboutMe user={userState} />
//                </div>
//             )}

//             {/* =================== User Content================ */}
//             {CheckMediaQuery() < 1000 && userState && loadingState === "done" && (
//                <AllContentMobile user={userState} />
//             )}
//             {CheckMediaQuery() >= 1000 && userState && loadingState === "done" && (
//                <AllContentDesktop user={userState} />
//             )}
//          </div>
//          {loadingState === "loading" && (
//             <CardsLazyLoading amount={7} compClass={cardaLazyloadingStyles.userProfile} />
//          )}
//          {loadingState == "error" && <ResourceNotFoundError />}
//          <div className={`large-spacer`}> </div>
//          <NavigationMenu />
//       </>
//    );
// };

// export default User;
