// core
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// react
import client from "../../apollo-client";
import { CHECK_IF_PATRON_ACCOUNT, CREATE_CHECKOUT_SESSION } from "../../graphql/billing/billing";

// components

// style
import goProPageStyles from "../../styles/pages/GoPro.module.css";
import Link from "next/link";
import HeadContent from "../../SEO/head-content";
import { JoinTemplate } from "../../templates/subscription/join";

const GoPro = () => {
   // =================== go back in histroy   ============== //
   const router = useRouter();

   const [loadingState, setLoadingState] = useState<string>("loading");

   // =================== check if user is a patron   ============== //
   // Check if the user is a patron to redirect them appropiately
   const checkIfUserPatron = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_IF_PATRON_ACCOUNT
         });

         console.log(data);
         if (data.user_has_stripe_account > 0) {
            router.replace("/subscription/billing");
         } else if (data.user_has_stripe_account === 0) {
            setLoadingState("done");
         } else if (data.user_has_stripe_account === -1) {
            router.replace("/login");
         } else {
            setLoadingState("error");
         }
      } catch (error) {
         console.log(error);
         setLoadingState("error");
      }
   };

   useEffect(() => {
      checkIfUserPatron();
   }, []);

   return (
      <>
         <Head key='payment-apge'>
            <HeadContent />
         </Head>
         <div className={goProPageStyles.mainWrapper}>
            <JoinTemplate />
         </div>
         {/* {loadingState === "error" && <ResourceNotFoundError />} */}
      </>
   );
};

export default GoPro;
