// core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import HeadContent from "../../layouts/head-content";

// graphQL
import client from "../../apollo-client";
import { CHECK_IF_PATRON_ACCOUNT, GET_USER_PORTAL_SESSION } from "../../graphql/billing/billing";

// styles
import billingStlyes from "../../styles/pages/subscription/Billing.module.css";

// comps
import NavigationMenu from "../../layouts/navigation_main";

const Billing = () => {
   // set the router
   const router = useRouter();

   // user Details
   const [portalLinkState, setPortalLinkState] = useState<string>("loading");

   const getUserCheckoutData = async () => {
      try {
         const { data } = await client.query({
            query: GET_USER_PORTAL_SESSION,
            variables: {}
         });

         if (
            data.customer_portal.__typename === "User_Portal_Session" &&
            data.customer_portal.url
         ) {
            setPortalLinkState(data.customer_portal.url);
         } else if (data.customer_portal.__typename === "Failed_Order") {
            setPortalLinkState("");
         }
      } catch (error) {
         setPortalLinkState("error");
         console.log(error);
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
         <div className={billingStlyes.mainWrapper}>
            <Link href={`/users/me`}>
               <a className={`goBack `}></a>
            </Link>
            <div className={billingStlyes.imageWrapper}>
               <Image src='/images/layouts/stripe_dashboard.png' layout='fill' />
            </div>

            {portalLinkState != "error" && portalLinkState != "loading" && (
               <div>
                  <p>
                     Scholar cares about your security, that is why stripe is used in all
                     transactions to keep your billing information secure and private. To access
                     your Stripe portal click the button below 😊
                  </p>
                  <a
                     href={`${portalLinkState}`}
                     className={`std-button ${billingStlyes.dashboardButton}`}>
                     <p className={`std-button_gradient-text`}>ACCESS DASHOBOARD</p>
                  </a>
                  <div className='medium-spacer'></div>
               </div>
            )}
            {portalLinkState === "error" && (
               <div>
                  <p>
                     Your stripe account was not found. Please try again later or contact Scholar at
                     help@biblescholar.app
                  </p>
               </div>
            )}
            {portalLinkState === "loading" && <div></div>}
            <NavigationMenu />
         </div>
      </>
   );
};

export default Billing;
