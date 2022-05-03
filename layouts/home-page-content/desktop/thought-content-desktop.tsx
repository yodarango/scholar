// core
import { useState, useEffect } from "react";
import Image from "next/image";

// graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_THOUGHTS } from "../../../graphql/users/profile";

// comps
import Thought from "../../../posts/thought";
import SmallLoader from "../../../fragments/chunks/small-loader";
import CardsLazyLoading from "../../cards-lazy-loading";

// styles
import homePageContentDesktopStyles from "../../../styles/layouts/home-page-content/HomePageContentDesktop.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css"

// helpers
import { Tthought } from "../../../posts/thought";
import { Tuser } from "../../../pages/users/[userId]";

type commentaryContentDesktopProps = {
   user: Tuser;
};

const ThoughtContentDesktop = ({ user }: commentaryContentDesktopProps) => {
   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const [loadingState, setLoadingState] = useState<string>("loading")
   const [smallLoadingState, setSmallLoadingState] = useState<boolean>(false)
   const [thoughtsState, setThoughtsState] = useState<Tthought[]>([]);
   const [thoughtLastIdState, setThoughtLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   const requestThoughts = async () => {
      setSmallLoadingState(true)
      try {
         const { data } = await client.query({
            query: GET_PROFILE_THOUGHTS,
            variables: { ID: user.ID, totalCountOnly: false, last_id: thoughtLastIdState }
         });
   
         // add user values to each thought before passing it to the component
         if(data.users[0].all_posts.thoughts){
            const modifiedThoughts: any = [];
            data.users[0].all_posts.thoughts.map((thought: Tthought) =>
               modifiedThoughts.push({
                  ...thought,
                  creator: {
                     ID: user.ID,
                     avatar: user.avatar,
                     signature: user.signature,
                     approval_rating: user.approval_rating,
                     my_church: user.my_church,
                     first_name: user.first_name,
                     last_name: user.last_name
                  }
               })
            );
            setThoughtsState((thoughtsState) => [...thoughtsState, ...modifiedThoughts]);
            data.users[0].all_posts.thoughts.length < 20 ? setHideLoadMoreBttnState(true) : null;
            setLoadingState("done")
            setSmallLoadingState(false)
         }
         
      } catch (error) {
         setLoadingState("error")
         setSmallLoadingState(false)
         console.log(error)
         
      }
      
   };

   useEffect(() => {
      requestThoughts();
   }, [thoughtLastIdState]);

   return (
      <div className={homePageContentDesktopStyles.contentWrapper}>
         {thoughtsState && loadingState === "done" && <Thought thoughts={thoughtsState} user_authority_level={user.authority_level} />}
            {thoughtsState?.length === 0 && loadingState === "done" && <h2 className={homePageContentDesktopStyles.noNotifications}>
               No Thoughts have been posted yet
            </h2>}
            {loadingState === "loading" && <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.postCardCTSN}/>}
            {loadingState == "error" && (
                     <div className={`${cardsLazyLoadingStyles.errorImage}`}>
                        <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
                     </div>
            )}


            {!hideLoadMoreBttnState && !smallLoadingState &&(
            <button
               className={"std-button"}
               onClick={() => setThoughtLastIdState(thoughtsState[thoughtsState.length - 1].ID)}>
               <p className='std-button_gradient-text'>Load More</p>
            </button>
         )}
         {smallLoadingState && !hideLoadMoreBttnState && <SmallLoader />}
      </div>
   );
};

export default ThoughtContentDesktop;
