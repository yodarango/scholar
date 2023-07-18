// core
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// react
import { client } from "../../apollo-client";
import { CHECK_IF_PATRON_ACCOUNT } from "../../graphql/billing/billing";

// components
import HeadContent from "../../SEO/head_content";
import { JoinTemplate } from "../../components/templates/subscription/join";

// style
import styles from "../page_global.module.css";

const GoPro = () => {
   // router
   //const router = useRouter();

   // const [loadingState, setLoadingState] = useState<string>("loading");

   // //  check if user is a patron
   // // Check if the user is a patron to redirect them correctly
   // const checkIfUserPatron = async () => {
   //    try {
   //       const { data } = await client.query({
   //          query: CHECK_IF_PATRON_ACCOUNT
   //       });

   //       if (data.user_has_stripe_account > 0) {
   //          router.replace("/subscription/billing");
   //       } else if (data.user_has_stripe_account === 0) {
   //          setLoadingState("done");
   //       } else if (data.user_has_stripe_account === -1) {
   //          router.replace("/login");
   //       } else {
   //          setLoadingState("error");
   //       }
   //    } catch (error) {
   //       console.error(error);
   //       setLoadingState("error");
   //    }
   // };

   // useEffect(() => {
   //    //checkIfUserPatron();
   // }, []);

   return (
      <>
         <Head key='join-page'>
            <HeadContent title='Join' />
         </Head>
         <div className={styles.mainWrapper}>
            <JoinTemplate />
         </div>
         <div className='bottom-spacer'></div>
         <div className='spacer-page-bottom'></div>
         {/* {loadingState === "error" && <ResourceNotFound />} */}
      </>
   );
};

export default GoPro;
