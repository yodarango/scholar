// core
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadContent from "../../../../layouts/head-content";
//import { GetServerSideProps } from "next";

//graphQL
import { GET_EDIT_QUOTE } from "../../../../graphql/posts/quotes";
import client from "../../../../apollo-client";

// style
import cardsLazyLoadingStyles from "../../../../styles/layouts/CardsLazyLoading.module.css";

// child comps
import EditQuotePost from "../../../../posts/edit-posts/edit-quote-post";
import NavigationMenu from "../../../../layouts/navigation-menu";
import ResourceNotFoundError from "../../../../layouts/resource-not-found-error";

// helpers/ types
import { Tstory } from "../../../../posts/quotes-stroies";
import CardsLazyLoading from "../../../../layouts/cards-lazy-loading";
import { loggedInUser } from "../../../../helpers/auth/get-loggedin-user";

// type editQuoteProps = {
//    story: Tstory;
// };

const EditQuote = () => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [story, setStory] = useState<Tstory | null>(null);

   const router = useRouter();

   const getInitialData = async () => {
      // =================== Check if there is a Logged in user and fetch its data ========== /
      const authJWT = loggedInUser();

      // get the post ID
      const postId = router.query.id ? router.query.id : 0;

      // get the data
      try {
         const { data } = await client.query({
            query: GET_EDIT_QUOTE,
            variables: { ID: postId, showComments: false }
         });

         setStory(data.quote[0]);

         if (data.quote) {
            if (parseInt(data.quote[0].creator.ID) !== authJWT.ID) {
               router.replace(`/posts/quote/${data.quote[0].ID}`);
            } else {
               setLoadingState("done");
            }
         }
      } catch (error) {
         console.log(error);
         setLoadingState("error");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getInitialData();
      }
   }, [router.query, router.isReady]);

   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {story && loadingState === "done" && (
            <div className='main-wrapper'>{<EditQuotePost story={story} />}</div>
         )}
         {loadingState === "loading" && (
            <CardsLazyLoading amount={5} compClass={cardsLazyLoadingStyles.quoteEdit} />
         )}

         {loadingState == "error" && <ResourceNotFoundError />}
         <div className='large-spacer'></div>
         <NavigationMenu />
      </>
   );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//    const postId = query.id ? query.id : 0;
//    const { data } = await client.query({
//       query: GET_EDIT_QUOTE,
//       variables: { ID: postId, showComments: false }
//    });

//    console.log(data);
//    return {
//       props: { story: data.quote[0] || null }
//    };
// };

export default EditQuote;
