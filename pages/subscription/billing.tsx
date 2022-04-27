// core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// graphQL
import client from "../../apollo-client";
import { GET_USER_PORTAL_SESSION } from "../../graphql/billing/billing";

const Billing = () => {
   // set the router
   const router = useRouter();

   // user Details
   const [portalLinkState, setPortalLinkState] = useState<string>("");

   const getUserCheckoutData = async () => {
      try {
         const { data } = await client.query({
            query: GET_USER_PORTAL_SESSION,
            variables: {}
         });

         console.log(data.customer_portal.url);

         if (
            data.customer_portal.__typename === "User_Portal_Session" &&
            data.customer_portal.url
         ) {
            setPortalLinkState(data.customer_portal.url);
         } else if (data.customer_portal.__typename === "Failed_Order") {
            setPortalLinkState("");
         }
      } catch (error) {
         setPortalLinkState("");
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
         {/* <div>
        <Image src="/Parks10.png" layout="fill"/>
        </div> */}

         {portalLinkState != "" && (
            <div>
               <p>
                  Scholar cares about your security. Scholar uses stripe to keep your billing
                  information secure and private. To access your Stripe portal click the link below
                  😊
               </p>
               <a href={`${portalLinkState}`} className='std-button'>
                  {" "}
                  <p className='std-button_gradient-text'>ACCESS DASHOBOARD</p>{" "}
               </a>
            </div>
         )}
         {portalLinkState === "" && (
            <div>
               <p>
                  Your stripe account was not found. Please try again later or contact Scholar at
                  help@biblescholar.app
               </p>
            </div>
         )}
      </>
   );
};

export default Billing;
