// core
import { useState, useEffect } from "react";

// graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_THOUGHTS } from "../../../graphql/users/profile";

// styles
import homePageContentDesktopStyles from "../../../styles/layouts/home-page-content/HomePageContentDesktop.module.css";

// comps
import Thought from "../../../posts/thought";

// helpers
import { Tthought } from "../../../posts/thought";
import { Tuser } from "../../../pages/users/[userId]";

type commentaryContentDesktopProps = {
   user: Tuser;
};

const ThoughtContentDesktop = ({ user }: commentaryContentDesktopProps) => {
   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const [thoughtState, setThoughtState] = useState<Tthought[]>([]);
   const [thoughtLastIdState, setThoughtLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);
   useEffect(() => {
      const fetchMoreComments = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_THOUGHTS,
            variables: { ID: user.ID, totalCountOnly: false, last_id: thoughtLastIdState }
         });

         // add user values to each thought before passing it to the component
         const modifiedThoughts: any = [];
         data.users[0].all_posts.thoughts.map((thought: Tthought) =>
            modifiedThoughts.push({
               ...thought,
               creator: { ID: user.ID, avatar: user.avatar, signature: user.signature }
            })
         );
         setThoughtState((thoughtState) => [...thoughtState, ...modifiedThoughts]);
         data.users[0].all_posts.thoughts.length < 20 ? setHideLoadMoreBttnState(true) : null;
      };
      fetchMoreComments();
   }, [thoughtLastIdState]);

   return (
      <div className={homePageContentDesktopStyles.contentWrapper}>
         {<Thought thoughts={thoughtState} />}
         {!hideLoadMoreBttnState && (
            <button
               className={`${homePageContentDesktopStyles.stdButton} std-button`}
               onClick={() => setThoughtLastIdState(thoughtState[thoughtState.length - 1].ID)}>
               <p className={"std-button_gradient-text"}>Load More</p>
            </button>
         )}
      </div>
   );
};

export default ThoughtContentDesktop;
