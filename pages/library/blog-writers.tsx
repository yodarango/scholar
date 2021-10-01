// ************************** PURPOSE **************************** //
// *** This page component will load all the preacher  users ***** //
// *** that are allowed to submit content to the  **************** //
// *** library. The users are selected by the Product owner ****** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

// graphql
import { gql } from "@apollo/client";
import client from "../../apollo-client";

// components
import Header from "../../layouts/header";
import LibraryBlogWriter from "../../fragments/library-blog-writer";
//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";

// types
import { ThostData } from "../../fragments/library-blog-writer";
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
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip } = context.query;
   if (!skip) {
      skip = "0";
   }
   const { data } = await client.query({
      query: gql`
         query ($skip: String!) {
            AuthorizedContentProvider(skip: $skip, userType: BLOGWRITER) {
               id
               fullName
               avatar
               recommended
               organization
               userType
            }
         }
      `,
      variables: { skip: skip }
   });

   return {
      props: {
         users: data.AuthorizedContentProvider
      }
   };
};

export default BlogWritter;
