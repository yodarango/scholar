// core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import HeadContent from "../../SEO/head_content";

// graphQL
import { client } from "../../apollo-client";
import { GET_ORDER_SUCCESS_DATA } from "../../graphql/billing/billing";

// styles
import styles from "./success.module.css";
import { SuccessTemplate } from "../../components/templates/subscription/success";
import { Confetti } from "../../components/fragments/feedback/confetti";

const Success = () => {
   // router
   const router = useRouter();

   // states
   const [checkout, setcheckout] = useState<any>(false);
   const [isLoggedIn, setisLoggedIn] = useState(false);
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
            setcheckout(data.order_success);
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

   //! coming from checkout = name and email
   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {!isLoggedIn && (
            <div className={styles.mainWrapper}>
               <SuccessTemplate name={checkout.name} email={checkout.email} />
            </div>
         )}
      </>
   );
};

export default Success;
