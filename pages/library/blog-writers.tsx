// ************************** PURPOSE **************************** //
// *** This page component will load all the preacher  users ***** //
// *** that are allowed to submit content to the  **************** //
// *** library. The users are selected by the Product owner ****** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import Header from "../../layouts/header";
import LibraryBlogWriter from "../../fragments/library-blog-writer";
//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";

// types
import { ThostData } from "../../fragments/library-podcast-hosts";
import NavigationMenu from "../../layouts/navigation-menu";

type sermonsByAuthorProps = {
   users: ThostData[];
};
const BlogWritter = ({ users }: sermonsByAuthorProps) => {
   return (
      <>
         <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"WRITERS"} />
            <h1 className={sermonsByAuthorStyles.title}>Select a Writer</h1>
            <div className={`${sermonsByAuthorStyles.usersGrid}`}>
               {users.map((user: ThostData) => {
                  return <LibraryBlogWriter key={user.id} userData={user} />;
               })}
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// fetch data
export const getStaticProps: GetStaticProps = async () => {
   const req = await fetch("https://scholar-be.herokuapp.com/users");
   const users = await req.json();

   return {
      props: { users },
      revalidate: 60 * 60 * 24 // refresh data every day
   };
};

export default BlogWritter;
