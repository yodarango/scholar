import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// graphQL
import client from "../../../apollo-client";
import { GET_USER_PORTAL_SESSION } from "../../../graphql/billing/billing";

// components
import { Primary } from "../../fragments/buttons/primary";
import { Header } from "../../fragments/Typography/header";
import { Parragraph } from "../../fragments/Typography/parragraph";

// styles
import styles from "./billing.module.css";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

export const BillingTemplate = () => {
   // state
   const [userData, setuserData] = useState<string | null>(null);
   const [loading, setloading] = useState<string>("loading");

   // router
   const router = useRouter();
   // get the user's billing info
   const getUserData = async () => {
      try {
         const { data } = await client.query({
            query: GET_USER_PORTAL_SESSION,
            variables: {}
         });

         if (
            data.customer_portal.__typename === "User_Portal_Session" &&
            data.customer_portal.url
         ) {
            setuserData(data.customer_portal.url);
         } else if (data.customer_portal.__typename === "Failed_Order") {
            setuserData(null);
            setloading("error");
         }
      } catch (error) {
         setuserData(null);
         setloading("error");
         console.log(error);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         //getUserData();
      }
   }, [router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.layer}>
            <div className={`${styles.graphics} ${loading === "error" && styles.error}`}></div>
         </div>
         <div className={styles.message}>
            <div className={styles.title}>
               <Header
                  type={5}
                  text='Scholar cares bout your privacy'
                  size='large'
                  align='center'
               />
            </div>
            <div className={styles.parragraph}>
               <Parragraph
                  text={`Stripe is used in all
                     transactions to keep your billing information secure and private. To access
                     your Stripe portal click the button below`}
                  size='main'
                  align='center'
               />
            </div>
            <div className={styles.button}>
               {userData && loading === "done" && (
                  <Primary title='Access dashboard' href={userData} type='2' />
               )}
               {loading === "error" && <Primary title='Go to profile' href='/users/@me' type='2' />}
            </div>
         </div>
      </div>
   );
};
