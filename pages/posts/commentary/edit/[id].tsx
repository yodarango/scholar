import { useEffect, useState } from "react";
//import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

// child comps
import EditPost from "../../../../posts/edit-posts/edit-commentary-post";
import NavigationMenu from "../../../../layouts/navigation-menu";
import CardsLazyLoading from "../../../../layouts/cards-lazy-loading";
import parseJwt from "../../../../helpers/auth/decodeJWT";
import getCookie from "../../../../helpers/get-cookie";

// styles
import cardsLazyLoadingStyles from "../../../../styles/layouts/CardsLazyLoading.module.css";

// graphQL
import client from "../../../../apollo-client";
import { GET_EDIT_COMMENTARY } from "../../../../graphql/posts/commentaries";

// helpers / types
import { Tcommentary } from "../../../../posts/comment";
// import { Tuser } from "../../../users/[userId]";

// type editComentaryProps = {
//    commentary: Tcommentary;
// };

const EditCommentary = () => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [commentary, setCommentary] = useState<Tcommentary | null>(null);

   const router = useRouter();

   const getInitialData = async () => {
      // =================== Check if there is a Logged in user and fetch its data ========== /
      const token: string = getCookie("authorization");
      let parsedUser = parseJwt(token);

      // get the post ID
      const postId = router.query.id ? router.query.id : 0;

      // get the data
      try {
         const { data } = await client.query({
            query: GET_EDIT_COMMENTARY,
            variables: { ID: postId }
         });
         setCommentary(data.commentary[0]);

         if (data.commentary) {
            if (parseInt(data.commentary[0].creator.ID) !== parsedUser.ID) {
               router.replace(`/posts/commentary/${data.commentary[0].ID}`);
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
         {commentary && loadingState === "done" && (
            <div className='main-wrapper'>
               <EditPost commentary={commentary} />
            </div>
         )}

         {loadingState === "loading" && (
            <CardsLazyLoading amount={3} compClass={cardsLazyLoadingStyles.commentaryEdit} />
         )}

         {loadingState == "error" && (
            <div
               className={`${cardsLazyLoadingStyles.errorImage} ${cardsLazyLoadingStyles.errorImageFP}`}>
               <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
            </div>
         )}

         <div className='large-spacer'></div>
         <NavigationMenu />
      </>
   );
};

export default EditCommentary;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//    const postId = query.id ? query.id[0] : 0;
//    const { data } = await client.query({
//       query: GET_ONE_COMMENTARY,
//       variables: { ID: postId, showComments: true }
//    });
//    return {
//       props: { commentary: data.commentary[0] || null }
//    };
// };
