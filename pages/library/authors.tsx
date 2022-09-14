// ************************** PURPOSE **************************** //
// *** This page component will load all the authorixed ********** //
// *** users that are allowed to submit content to the  ********** //
// *** library. The users are selected by the Product owner ****** //

// core
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeadContent from "../../SEO/head-content";
//import { GetServerSideProps } from "next";
import Image from "next/image";

// graphql
import client from "../../apollo-client";
import { GET_LIB_APPROVED_USERS } from "../../graphql/library/users";

// components
import Header from "../../layouts/header";
import LibraryAuthor from "../../fragments/library-author";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import NavigationMenu from "../../layouts/navigation_main";
import ResourceNotFoundError from "../../fragments/chunks/error_resource_not_found";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { IuserData } from "../../fragments/library-author";

// type sermonsByAuthorProps = {
//    users: IuserData[];
// };
const Authors = () => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   const router = useRouter();
   const { content } = router.query;

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<IuserData[]>([]);
   const getInitialData = async () => {
      let { skip } = router.query;
      if (!skip) {
         skip = "0";
      }
      try {
         const { data } = await client.query({
            query: GET_LIB_APPROVED_USERS,
            variables: { skip, userType: "AUTHOR" }
         });

         setInitialDataState(data.AuthorizedContentProvider);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
         setInitialDataState([]);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         setLoadingState("loading");
         getInitialData();
      }

      return () => {
         setInitialDataState([]);
      };
   }, [router.query]);

   return (
      <>
         <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
            <Head>
               <HeadContent />
            </Head>
            <Header currPage={"AUTHORS"} />
            <h1 className={`${sermonsByAuthorStyles.title}`}>Select an author</h1>
            <div className={`${sermonsByAuthorStyles.usersGrid}`}>
               {initialDataState &&
                  loadingState == "done" &&
                  initialDataState.map((user: IuserData) => {
                     return <LibraryAuthor key={user.id} userData={user} content={content} />;
                  })}
               {loadingState == "loading" && (
                  <CardsLazyLoading amount={16} compClass={cardsLazyLoadingStyles.librayUsers} />
               )}
               {loadingState === "error" && <ResourceNotFoundError />}
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// fetch data
// export const getServerSideProps: GetServerSideProps = async (context) => {
//    let { skip } = context.query;
//    if (!skip) {
//       skip = "0";
//    }
//    const { data } = await client.query({
//       query: gql`
//          query ($skip: String!) {
//             AuthorizedContentProvider(skip: $skip, userType: AUTHOR) {
//                id
//                fullName
//                avatar
//                recommended
//                organization
//                userType
//             }
//          }
//       `,
//       variables: { skip: skip }
//    });

//    return {
//       props: {
//          users: data.AuthorizedContentProvider
//       }
//    };
// };

export default Authors;
