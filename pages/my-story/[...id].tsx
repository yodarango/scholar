// core
import { GetServerSideProps } from "next";
import React from "react";
import Header from "../../layouts/header";
import Link from "next/link";

// styles
import myStoryStyles from "../../styles/pages/my-story/MyStory.module.css";

// helpers
import { Tuser } from "../users/[...userId]";

type storyProps = {
   user: Tuser;
};
const Story = ({ user }: storyProps) => {
   return (
      <div className={myStoryStyles.mainWrapper}>
         <Header currPage={"MY STORY"} />
         <h1 className={myStoryStyles.title}>{user.signature}</h1>
         <Link href={`/users/${user.id}`}>
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
         <p className={myStoryStyles.content}>{user.story}</p>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { id } = context.query;

   const req = await fetch(`https://scholar-be.herokuapp.com/users/123`);
   const user = await req.json();
   console.log(user);
   return {
      props: {
         user
      }
   };
};

export default Story;
