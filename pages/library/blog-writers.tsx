// ************************** PURPOSE **************************** //
// *** This page component will load all the preacher  users ***** //
// *** that are allowed to submit content to the  **************** //
// *** library. The users are selected by the Product owner ****** //

// core
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
//import { GetServerSideProps } from "next";
import Image from "next/image";

// graphql
import client from "../../apollo-client";
import { GET_LIB_APPROVED_USERS } from "../../graphql/library/users";

// components
import Header from "../../layouts/header";
import LibraryBlogWriter from "../../fragments/library-blog-writer";
import NavigationMenu from "../../layouts/navigation-menu";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { ThostData } from "../../fragments/library-blog-writer";

// type sermonsByAuthorProps = {
//    users: ThostData[];
// };
const BlogWritter = () => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   const router = useRouter();

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<ThostData[]>([]);
   const getInitialData = async () => {
      let { skip } = router.query;
      if (!skip) {
         skip = "0";
      }
      try {
         const { data } = await client.query({
            query: GET_LIB_APPROVED_USERS,
            variables: { skip, userType: "BLOGWRITER" }
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
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"WRITERS"} />
            <h1 className={sermonsByAuthorStyles.title}>Select a Writer</h1>
            <div className={`${sermonsByAuthorStyles.usersGrid}`}>
               {initialDataState &&
                  loadingState == "done" &&
                  initialDataState.map((user: ThostData) => {
                     return <LibraryBlogWriter key={user.id} userData={user} />;
                  })}

               {loadingState == "loading" && (
                  <CardsLazyLoading amount={16} compClass={cardsLazyLoadingStyles.librayUsers} />
               )}
               {loadingState === "error" && (
                  <div
                     className={`${cardsLazyLoadingStyles.errorImage} ${cardsLazyLoadingStyles.errorImageLibPage}`}>
                     <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
                  </div>
               )}
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
//             AuthorizedContentProvider(skip: $skip, userType: BLOGWRITER) {
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

export default BlogWritter;
