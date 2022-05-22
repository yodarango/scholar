// core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import HeadContent from "../../layouts/head-content";

// graphQL
import client from "../../apollo-client";
import { GET_ORDER_SUCCESS_DATA } from "../../graphql/billing/billing";

// styles
import subscriptionSuccessPageStyle from "../../styles/pages/subscription/Success.module.css";

const Success = () => {
   // router
   const router = useRouter();

   // user Details
   const [checkoutDeets, setCheckoutDeets] = useState<any>(false);
   const [failedTransaction, setFailedTransaction] = useState<string | boolean>(false);

   const getUserCheckoutData = async () => {
      try {
         const { data } = await client.query({
            query: GET_ORDER_SUCCESS_DATA,
            variables: { session_id: router.query.session_id }
         });

         if (data.order_success.__typename === "Successful_Order") {
            const today = Date.now();
            const expTime = new Date(today + 1209600000);

            document.cookie = `authorization=${data.order_success.token}; expires=${expTime}; path=/`;
            setCheckoutDeets(data.order_success);
         } else if (data.order_success.__typename === "Failed_Order") {
            setFailedTransaction(data.order_success.message);
         }
      } catch (error) {
         setFailedTransaction("your transaction failed. Please try again later");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getUserCheckoutData();
      }
   }, [router.isReady]);

   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         <div>
            {checkoutDeets && (
               <div className={subscriptionSuccessPageStyle.mainWrapper}>
                  <div className={subscriptionSuccessPageStyle.imageWrapper}>
                     <Image src='/images/layouts/subscription_thanks.png' layout='fill' />
                  </div>
                  <h1 className={`${subscriptionSuccessPageStyle.stdH1} std-button_gradient-text`}>
                     Welcome to Scholar
                  </h1>
                  <p>Thank you, {checkoutDeets.name} for keeping Scholar alive!</p>
                  <p>a confirmation email has been sent to {checkoutDeets.email}</p>

                  <button className={`std-button`}>
                     <Link href='/users/me'>
                        <a className={`std-button_gradient-text`}>Done</a>
                     </Link>
                  </button>
               </div>
            )}
            {failedTransaction}
         </div>
      </>
   );
};

export default Success;
