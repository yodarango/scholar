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
import LibraryPreachers from "../../fragments/library-preachers";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";

// types
import { TpreacherData } from "../../fragments/library-preachers";
import NavigationMenu from "../../layouts/navigation-menu";

type sermonsByAuthorProps = {
   users: TpreacherData[];
};
const Preachers = ({ users }: sermonsByAuthorProps) => {
   return (
      <>
         <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"PREACHERS"} />
            <h1 className={sermonsByAuthorStyles.title}>Select a preacher</h1>
            <div className={`${sermonsByAuthorStyles.usersGrid}`}>
               {users.map((user: TpreacherData) => {
                  return <LibraryPreachers key={user.id} userData={user} />;
               })}
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// get data
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip } = context.query;
   if (!skip) {
      skip = "0";
   }
   const { data } = await client.query({
      query: gql`
         query ($skip: String!) {
            AuthorizedContentProvider(skip: $skip, userType: PREACHER) {
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

export default Preachers;
