// core
import React, { useState, useEffect } from "react";

//graphQl
import client from "../../../apollo-client";
import { GET_PROFILE_THOUGHTS } from "../../../graphql/users/profile";

// comps
import Thought from "../../../posts/thought";

// styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";

// helpers types
import { Tuser } from "../../../pages/users/[userId]";
import { Tthought } from "../../../posts/thought";

type thoughtContentProps = {
   user: Tuser;
   handleCloseThoughts: any;
};
const ThoughtsContent = ({ user, handleCloseThoughts }: thoughtContentProps) => {
   const [thoughtsState, setThoughtsState] = useState<Tthought[]>([]);
   const [thoughtLastIdState, setThoughtLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   const requestThoughts = async () => {
      const { data } = await client.query({
         query: GET_PROFILE_THOUGHTS,
         variables: { ID: user.ID, totalCountOnly: false, last_id: thoughtLastIdState }
      });

      // add user values to each thought before passing it to the component
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
   };

   useEffect(() => {
      requestThoughts();
   }, [thoughtLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseThoughts}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            <h1 className={homePageContentStyles.popUpContentWrapper_title}>
               Thoughts by {user.signature}
            </h1>
            <Thought thoughts={thoughtsState} user_authority_level={user.authority_level} />
            {!hideLoadMoreBttnState && (
               <button
                  className={"std-button"}
                  onClick={() => setThoughtLastIdState(thoughtsState[thoughtsState.length - 1].ID)}>
                  <p className='std-button_gradient-text'>Load More</p>
               </button>
            )}
         </section>
      </div>
   );
};

export default ThoughtsContent;
