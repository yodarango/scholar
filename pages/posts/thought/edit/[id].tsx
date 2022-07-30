import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadContent from "../../../../layouts/head-content";
import Head from "next/head";
import Image from "next/image";

// graphQL
import client from "../../../../apollo-client";
import { GET_EDIT_THOUGHT } from "../../../../graphql/posts/thoughts";

// styles
import cardsLazyLoadingStyles from "../../../../styles/layouts/CardsLazyLoading.module.css";

// child comps
import EditThoughtPost from "../../../../posts/edit-posts/edit-thought-post";
import NavigationMenu from "../../../../layouts/navigation-menu";
import ResourceNotFoundError from "../../../../fragments/chunks/error_resource_not_found";

// helpers / types
import { Tthought } from "../../../../fragments/cards/posts/thought";
import CardsLazyLoading from "../../../../layouts/cards-lazy-loading";
import { loggedInUser } from "../../../../helpers/auth/get-loggedin-user";

// type editCommentaryProps = {
//    thought: Tthought;
// };
const EditCommentary = () => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [thought, setThought] = useState<Tthought | null>(null);

   const router = useRouter();

   const getInitialData = async () => {
      // =================== Check if there is a Logged in user and fetch its data ========== /
      const authJWT = loggedInUser();

      // get the post ID
      const postId = router.query.id ? router.query.id : 0;

      // get the data
      try {
         const { data } = await client.query({
            query: GET_EDIT_THOUGHT,
            variables: { ID: postId }
         });
         setThought(data.thought[0]);
         console.log(data);
         if (data.thought) {
            if (parseInt(data.thought[0].creator.ID) !== authJWT.ID) {
               router.replace(`/posts/thought/${data.thought[0].ID}`);
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
         {thought && loadingState === "done" && (
            <div className='main-wrapper'>
               <EditThoughtPost thought={thought} />
            </div>
         )}
         {loadingState === "loading" && (
            <CardsLazyLoading amount={2} compClass={cardsLazyLoadingStyles.thoughtEdit} />
         )}

         {loadingState == "error" && <ResourceNotFoundError />}

         <NavigationMenu />
      </>
   );
};

export default EditCommentary;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//    const postId = query.id ? query.id[0] : 0;
//    const { data } = await client.query({
//       query: GET_ONE_THOUGHT,
//       variables: { ID: postId, showComments: true }
//    });
//    return {
//       props: { thought: data.thought[0] || null }
//    };
// };
