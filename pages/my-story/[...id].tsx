// core
import { GetServerSideProps } from "next";
import React from "react";
import Header from "../../layouts/header";
import Link from "next/link";

// graphql
import client from "../../apollo-client";
import { GET_USER_STORY } from "../../graphql/users/users";

// components
import NavigationMenu from "../../layouts/navigation-menu";

// styles
import myStoryStyles from "../../styles/pages/my-story/MyStory.module.css";

// helpers
import { Tuser } from "../users/[userId]";

type storyProps = {
   user: Tuser;
};
const Story = ({ user }: storyProps) => {
   return (
      <>
         {user && user.ID && (
            <div className={myStoryStyles.mainWrapper}>
               <Header currPage={"MY STORY"} />
               <h1 className={myStoryStyles.title}>{user.signature}</h1>
               <Link href={`/users/${user.ID}`}>
                  <a>
                     <div
                        className={myStoryStyles.reputationWrapper}
                        style={{ backgroundImage: `linear-gradient(130deg, #ff9214ed, #ff0045)` }}>
                        <div
                           className={myStoryStyles.avatar}
                           style={{ backgroundImage: `url(${user.avatar})` }}></div>
                     </div>
                  </a>
               </Link>
               {user.my_story && <p className={myStoryStyles.content}>{user.my_story}</p>}
               {!user.my_story && (
                  <div>
                     <p className={myStoryStyles.content}>
                        This user has not yet posted a story about them. Let them know you'd like to
                        hear their story!
                     </p>
                     <button className={`std-button ${myStoryStyles.requestStory}`}>
                        <p className='std-button_gradient-text'>I'd like to hear your story</p>
                     </button>
                  </div>
               )}
            </div>
         )}
         {!user || (!user.ID && <div>User does not Exists #NEEDSGRAPHICS</div>)}
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { id } = context.query;
   const userId = id ? id[0] : null;

   const { data } = await client.query({
      query: GET_USER_STORY,
      variables: {
         ID: userId
      }
   });

   const user = data.users && data.users.length > 0 ? data.users[0] : {};
   return {
      props: {
         user
      }
   };
};

export default Story;
