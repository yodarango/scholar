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

type TAccountVerificationprops = {
   email: string;
};

export const AccountVerification = ({ email }: TAccountVerificationprops) => {
   const [renderContent, setRenderContent] = useState(false);
   const userCtx = useContext(UserContext);
   const { user } = userCtx;

   const getData = async () => {
      try {
         const { data, status } = await getIsFirstTimeSignUp();
         if (status === "done") {
            if (data && user.ID) {
               setRenderContent(true);
            } else if (!data && user?.ID) {
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
                           email ? email : "your email"
                        } Please enter it below`}
                     />
                  </div>
               </div>
               <div className={styles.form}>
                  <OTCVerification />
               </div>
            </div>
         )}
      </>
   );
};
