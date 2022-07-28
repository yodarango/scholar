// core
//import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Header from "../../../layouts/header";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadContent from "../../../layouts/head-content";
import Image from "next/image";

// graphql
import client from "../../../apollo-client";
import { GET_USER_STORY } from "../../../graphql/users/users";
import { NEW_NOTIFICATION } from "../../../graphql/users/notifications";
import { UPDATE_MY_STORY } from "../../../graphql/users/profile";

// components
import NavigationMenu from "../../../layouts/navigation-menu";
import SmallLoader from "../../../fragments/chunks/small_loader";
import NotificationPopup from "../../../fragments/popups/notification";
import SimpleTextEditor from "../../../fragments/chunks/simple-text-editor";
import ResourceNotFoundError from "../../../fragments/chunks/error_resource_not_found";

// styles
import myStoryStyles from "../../../styles/pages/users/my-story/MyStory.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// types
import { Tuser } from "../[userId]";

// helpers
import { loggedInUser } from "../../../helpers/auth/get-loggedin-user";

// type storyProps = {
//    user: Tuser | null;
// };

const Story = () => {
   // value to be updated inside the get inital data fucnction
   let checkLoggedInUser: number;

   // router
   const router = useRouter();

   // states
   const [loadingState, setloadingState] = useState("loading");
   const [initialDataState, setinitialDataState] = useState<Tuser | null>(null);
   const [smallLoaderState, setsmallLoaderState] = useState<boolean>(false);
   const [popUpNotificationState, setpopUpNotificationState] =
      useState<boolean | JSX.Element>(false);
   const [isSameUser, setisSameUser] = useState<boolean>();
   const [showEditorState, setShowEditorState] = useState<boolean>(false);
   const [textEditorSmallLoader, setTextEditorSmallLoader] = useState<boolean>(false);
   const [currentTextState, setCurrentTextState] = useState<string | undefined>(undefined);

   //  get the inital data
   const getInitialData = async () => {
      const { id } = router.query;

      // check if the user is authenticated
      const authJWT = loggedInUser();
      if (authJWT) {
         let parsedUser = authJWT;
         checkLoggedInUser = parsedUser.ID;
      } else {
         checkLoggedInUser = 0;
      }

      console.log(id);
      try {
         const userId: number | string | string[] = id ? id : 0;

         const { data } = await client.query({
            query: GET_USER_STORY,
            variables: {
               ID: userId
            }
         });

         console.log(data);
         setinitialDataState(data.users[0]);
         setCurrentTextState(data.users[0].my_story);
         setloadingState("done");

         setisSameUser(userId == checkLoggedInUser);
      } catch (error) {
         setinitialDataState(null);
         setloadingState("error");
      }
   };

   // call the function load
   useEffect(() => {
      if (router.isReady) {
         getInitialData();
      }
      return () => {
         setinitialDataState(null);
      };
   }, [router.isReady]);

   // ------------------- request the story -----------
   const requestStory = async () => {
      setsmallLoaderState(true);
      try {
         const { data } = await client.mutate({
            mutation: NEW_NOTIFICATION,
            variables: {
               CONTENT_TYPE: 5,
               body: "Someone has suggested you should write your story. You should consider it 😉",
               USER_ID: initialDataState?.ID,
               POST_ID: initialDataState?.ID
            }
         });
         console.log(data);
         if (data.new_notification.ID) {
            setpopUpNotificationState(
               <NotificationPopup
                  title={"Sucess! ✅"}
                  contentString={"This user has been notified!"}
                  closeModal={() => setpopUpNotificationState(false)}
                  newClass={`notification-wrapper--Success`}
               />
            );
            setsmallLoaderState(false);
         }
      } catch (error: any) {
         console.log(error);
         setpopUpNotificationState(
            <NotificationPopup
               closeModal={() => setpopUpNotificationState(false)}
               title={error.graphQLErrors ? "You're not authorized! 👮‍♂️" : "Oh no!"}
               contentString={
                  error.graphQLErrors
                     ? error.graphQLErrors[0]?.message
                     : "Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!"
               }
               newClass='notification-wrapper--Error'
            />
         );
         setsmallLoaderState(false);
      }
   };

   // ----------------- submit the story -----------
   const updateMyStory = async (text: string) => {
      setTextEditorSmallLoader(true);

      try {
         const { data } = await client.mutate({
            mutation: UPDATE_MY_STORY,
            variables: {
               body: text
            }
         });

         if (data.update_my_story === true) {
            setCurrentTextState(text);
            setShowEditorState(false);
            setTextEditorSmallLoader(false);
         } else {
            setTextEditorSmallLoader(false);
            setShowEditorState(false);
            setpopUpNotificationState(
               <NotificationPopup
                  closeModal={() => setpopUpNotificationState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         setTextEditorSmallLoader(false);
         setShowEditorState(false);
         setpopUpNotificationState(
            <NotificationPopup
               closeModal={() => setpopUpNotificationState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
         console.log(error);
      }
   };
   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {popUpNotificationState}
         {initialDataState && loadingState === "done" && (
            <div className={myStoryStyles.mainWrapper}>
               <Link href={`/users/${initialDataState.ID}`}>
                  <a className={`std-vector-icon ${myStoryStyles.goBackIcon}`}></a>
               </Link>
               {isSameUser && !showEditorState && (
                  <div
                     className={myStoryStyles.editStoryIcon}
                     onClick={() => setShowEditorState(true)}></div>
               )}
               {isSameUser && showEditorState && (
                  <div
                     className={myStoryStyles.editStoryIcon}
                     onClick={() => setShowEditorState(false)}></div>
               )}
               <Header currPage={"MY STORY"} />
               <h1 className={myStoryStyles.title}>{initialDataState.signature}</h1>
               <div
                  className={myStoryStyles.reputationWrapper}
                  style={{ backgroundImage: `linear-gradient(130deg, #ff9214ed, #ff0045)` }}>
                  <Link href={`/users/${initialDataState.ID}`}>
                     <a>
                        <div
                           className={myStoryStyles.avatar}
                           style={{ backgroundImage: `url(${initialDataState.avatar})` }}></div>
                     </a>
                  </Link>
               </div>

               {currentTextState && !showEditorState && (
                  <p className={myStoryStyles.content}>{currentTextState}</p>
               )}
               {showEditorState && (
                  <SimpleTextEditor
                     buttonTitle='UPDATE'
                     defValue={currentTextState}
                     handleEvent={updateMyStory}
                     smallLoader={textEditorSmallLoader}
                  />
               )}
               {!initialDataState.my_story && !isSameUser && (
                  <div>
                     <p className={`${myStoryStyles.content} ${myStoryStyles.noContent}`}>
                        This user has not posted their story about yet. Let them know you'd like to
                        hear their story by clicking the button below!
                     </p>
                     <div className={myStoryStyles.sendIcon}></div>
                     {!smallLoaderState && (
                        <button
                           className={`std-button ${myStoryStyles.requestStory}`}
                           onClick={requestStory}>
                           <p className='std-button_gradient-text'>I'd like to hear your story</p>
                        </button>
                     )}
                     {smallLoaderState && <SmallLoader />}
                  </div>
               )}
            </div>
         )}
         {loadingState == "error" && <ResourceNotFoundError />}
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//    const { id } = context.query;
//    const userId = id ? id[0] : null;

//    const { data } = await client.query({
//       query: GET_USER_STORY,
//       variables: {
//          ID: userId
//       }
//    });

//    const user = data.users && data.users.length > 0 ? data.users[0] : {};
//    return {
//       props: {
//          user
//       }
//    };
// };

export default Story;
