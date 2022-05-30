// core
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// react
import client from "../../apollo-client";
import { CHECK_IF_PATRON_ACCOUNT, CREATE_CHECKOUT_SESSION } from "../../graphql/billing/billing";

// components
import NavigationMenu from "../../layouts/navigation-menu";

// style
import goProPageStyles from "../../styles/pages/GoPro.module.css";
import Link from "next/link";
import HeadContent from "../../layouts/head-content";
import ResourceNotFoundError from "../../layouts/resource-not-found-error";

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

   // =================== Create checkout Session ============= //
   const checkout = async () => {
      const { data } = await client.mutate({
         mutation: CREATE_CHECKOUT_SESSION,
         variables: {
            price_id: process.env.NEXT_PUBLIC_BSTRIPE_PRODUCT_ID
         }
      });

      console.log(data.create_checkout_session != "error");
      if (data.create_checkout_session) {
         router.replace(data.create_checkout_session);
      }
   };

   return (
      <>
         <Head key='payment-apge'>
            <HeadContent />
         </Head>
         {loadingState === "done" && (
            <div className={goProPageStyles.mainWrapper}>
               <Link href={`/users/me`}>
                  <a className={`goBack ${goProPageStyles.goBack}`}></a>
               </Link>

               <h1 className={`${goProPageStyles.stdH1} std-button_gradient-text`}>
                  HELP SCHOLAR STAY ALIVE!
               </h1>
               {/* <button
               className={`std-button--clear ${goProPageStyles.stdButton} ${goProPageStyles.stdButtonClear}`}>
               <p className={`std-button_gradient-text`}>ONE TIME DONATION</p>
            </button> */}

               <button className={`std-button ${goProPageStyles.stdButton}`} onClick={checkout}>
                  <p className={`std-button_gradient-text`}>JOIN FOR ONLY $3.99/month</p>
               </button>
               <p className={`std-text-block--info ${goProPageStyles.stdInfoText}`}>
                  Cancel any time!
               </p>
               <div className={`${goProPageStyles.verctorItem}`}></div>
               <h2 className={goProPageStyles.stdH2}>Why Subscribe?</h2>
               <p className={goProPageStyles.stdP}>
                  When you subscribe you help Scholar:
                  <ul>
                     <li>Stay alive</li>
                     <li>Stay ad free</li>
                     <li>Stay looking slick</li>
                     <li>Work efficiently</li>
                     <li>provide great Christian resources</li>
                     <li>Continue growing and improving</li>
                  </ul>
               </p>
               <h2 className={goProPageStyles.stdH2}>
                  Are there any benefits to the subscription?
               </h2>
               <p className={goProPageStyles.stdP}>
                  Scholar does not limit the consumption of any of its content to any users. The
                  purpose of Scholar is to help Christians fall in love with the Word of God,
                  therefore it aims to provide all content for free. However, data and development
                  are very expensive and therefore there is a limit to how much data can be created
                  without a subscription. Purchasing a subscription will allow you unlimited content
                  creation and future priviledged access to certain resources <br />
               </p>
               <table className={goProPageStyles.table}>
                  <tbody>
                     <tr>
                        <th>FREE</th>
                        <th>SUBS</th>
                     </tr>
                     <tr>
                        <td>Limit to 5 commentary posts</td>
                        <td>Unlimited commentary posts</td>
                     </tr>
                     <tr>
                        <td>Limit to 5 quote posts</td>
                        <td>Unlimited quote posts</td>
                     </tr>
                     <tr>
                        <td>Limit to 5 thought posts</td>
                        <td>Unlimited thought posts</td>
                     </tr>
                     <tr>
                        <td>0 sermon notes uploads</td>
                        <td>Unlimited sermon notes uploads</td>
                     </tr>
                     <tr>
                        <td>Limit to 5 post comments/ day</td>
                        <td>Unlimited comments</td>
                     </tr>
                  </tbody>
               </table>
               {/* <h2 className={goProPageStyles.stdH2}>Does it really take alot to run Scholar?</h2>
         <div className={`${goProPageStyles.infrastructureIcons}`}>

         </div> */}

               <div className={"large-spacer"}></div>
               <NavigationMenu />
            </div>
         )}
         {loadingState === "error" && <ResourceNotFoundError />}
      </>
   );
};

export default GoPro;
