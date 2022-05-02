// core
//import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Header from "../../../layouts/header";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

// graphql
import client from "../../../apollo-client";
import { GET_USER_STORY } from "../../../graphql/users/users";
import { NEW_NOTIFICATION } from "../../../graphql/users/notifications";

// components
import NavigationMenu from "../../../layouts/navigation-menu";

// styles
import myStoryStyles from "../../../styles/pages/users/my-story/MyStory.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// helpers
import { Tuser } from "../[userId]";
import SmallLoader from "../../../fragments/chunks/small-loader";
import NotificationPopup from "../../../fragments/notification-popup";

// type storyProps = {
//    user: Tuser | null;
// };
const Story = () => {
   // router
   const router = useRouter();
   const [loadingState, setloadingState] = useState("loading");
   const [initialDataState, setinitialDataState] = useState<Tuser | null>(null);
   const [smallLoaderState, setsmallLoaderState] = useState<boolean>(false);
   const [popUpNotificationState, setpopUpNotificationState] = useState<boolean | JSX.Element>(
      false
   );

   //  get the inital data
   const getInitialData = async () => {
      const { id } = router.query;
      try {
         const userId = id ? id[0] : null;

         const { data } = await client.query({
            query: GET_USER_STORY,
            variables: {
               ID: userId
            }
         });

         setinitialDataState(data.users[0]);
         setloadingState("done");
      } catch (error) {
         setinitialDataState(null);
         setloadingState("error");
      }
   };

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
               body: "Someone has suggested you should writ your story. You should consider it 😉",
               USER_ID: initialDataState?.ID,
               POST_ID: initialDataState?.ID
            }
         });

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
      } catch (error) {
         console.log(error);
         setpopUpNotificationState(
            <NotificationPopup
               closeModal={() => setpopUpNotificationState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   return (
      <>
         {popUpNotificationState}
         {initialDataState && loadingState === "done" && (
            <div className={myStoryStyles.mainWrapper}>
               <Header currPage={"MY STORY"} />
               <h1 className={myStoryStyles.title}>{initialDataState.signature}</h1>
               <Link href={`/users/${initialDataState.ID}`}>
                  <a>
                     <div
                        className={myStoryStyles.reputationWrapper}
                        style={{ backgroundImage: `linear-gradient(130deg, #ff9214ed, #ff0045)` }}>
                        <div
                           className={myStoryStyles.avatar}
                           style={{ backgroundImage: `url(${initialDataState.avatar})` }}></div>
                     </div>
                  </a>
               </Link>
               {initialDataState.my_story && (
                  <p className={myStoryStyles.content}>{initialDataState.my_story}</p>
               )}
               {!initialDataState.my_story && (
                  <div>
                     <p className={`${myStoryStyles.content} ${myStoryStyles.noContent}`}>
                        This user has not yet posted a story about them. Let them know you'd like to
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
         {loadingState == "error" && (
            <div
               className={`${cardsLazyLoadingStyles.errorImage} ${cardsLazyLoadingStyles.errorImageFP}`}>
               <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
            </div>
         )}
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
