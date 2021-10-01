// ************************** PURPOSE **************************** //
// *** This page component will load all the authorixed ********** //
// *** users that are allowed to submit content to the  ********** //
// *** library. The users are selected by the Product owner ****** //

// core
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

// graphql
import { gql } from "@apollo/client";
import client from "../../apollo-client";

// components
import Header from "../../layouts/header";
import LibraryAuthor from "../../fragments/library-author";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";

// types
import { IuserData } from "../../fragments/library-author";
import NavigationMenu from "../../layouts/navigation-menu";

type sermonsByAuthorProps = {
   users: IuserData[];
};
const Authors = ({ users }: sermonsByAuthorProps) => {
   const router = useRouter();
   const { content } = router.query;
   console.log(content);

   return (
      <>
         <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"AUTHORS"} />
            <h1 className={`${sermonsByAuthorStyles.title}`}>Select an author</h1>
            <div className={`${sermonsByAuthorStyles.usersGrid}`}>
               {users.map((user: IuserData) => {
                  return <LibraryAuthor key={user.id} userData={user} content={content} />;
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
            AuthorizedContentProvider(skip: $skip, userType: AUTHOR) {
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

export default Authors;
