// comp
import { useContext, useEffect, useState } from "react";

// comps
import { Parragraph } from "../../fragments/Typography/parragraph";
import { OTCVerification } from "../../layouts/forms/otc_verification";
import { Layer1 } from "../../layouts/backgrounds/layer_1";

// styles
import styles from "./account_verification.module.css";
import { UserContext } from "../../../context";
import { getIsFirstTimeSignUp } from "../../../helpers/functions/users/get_is_first_time_sign_up";
import { useRouter } from "next/router";
import { isUserVerified } from "../../../helpers/functions/users/is_user_verified";

export const AccountVerification = () => {
   const [renderContent, setRenderContent] = useState(false);
   const router = useRouter();
   const userCtx = useContext(UserContext);
   const { user } = userCtx;

   const getData = async () => {
      try {
         const { data, status } = await isUserVerified();

         if (status === "done") {
            if (data === false && user.ID) {
               setRenderContent(true);
            } else if (data === true && user?.ID) {
               window.location.href = "/users/@me";
            } else if (!user?.ID) {
               window.location.href = "/login";
            } else {
               setRenderContent(true);
            }
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (user) getData();
      else {
         router.push("/login");
      }
   }, [user]);
   return (
      <>
         {renderContent && (
            <div className={styles.mainWrapper}>
               <Layer1 />
               <div className={styles.logoWrapper}>
                  <div className={styles.logo}></div>
                  <div className={styles.title}>
                     <Parragraph align='center' bold size='xlarge' text='Welcome to Shrood' />
                  </div>
                  <div className={styles.desc}>
                     <Parragraph
                        align='center'
                        size='large'
                        text={`Thank you for registering. A verification code was sent to ${
                           user?.email ? user.email : "your email"
                        } Please enter it below`}
                     />
                  </div>
               </div>
               <div className={styles.form}>
                  <OTCVerification
                     cta={{ handleResult: () => router.push("/users/@me") }}
                     isForgottenPassword={false}
                  />
               </div>
            </div>
         )}
      </>
   );
};
