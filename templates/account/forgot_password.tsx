/**************************************************************************************** 
-   This component handles the complete "forgot password" process. 
-   it updates the parent where in the process is at through the cta.handleStepProcess 
    props so the parent can update the correct message and graphics.
****************************************************************************************/
import { useState } from "react";

// comps
import { OTCVerification } from "../../layouts/forms/otc_verification";
import { EmailVerification } from "../../layouts/forms/email_verification";
import { ChangePassword } from "../../layouts/forms/change_password";

// styles
import styles from "./account_verification.module.css";
import { BackgroundOne } from "../../public/images/backgrounds/top_half_gradient";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Primary } from "../../fragments/buttons/primary";
import { Confetti } from "../../fragments/feedback/confetti";
import Portal from "../../hoc/potal";

type TForgotPasswordFormProps = {
   cta?: {
      handleStepProcess: (step: number) => void;
   };
};
export const ForgotPasswordTemplate = ({ cta }: TForgotPasswordFormProps) => {
   const [stepProcess, setstepProcess] = useState<number>(0);

   const handleUpdateStep = (step: number) => {
      console.log("step", step);
      step === 1 && setstepProcess((prev) => prev + 1);
   };

   return (
      <div className={styles.mainWrapper}>
         {stepProcess === 3 && (
            <Portal>
               <Confetti />
            </Portal>
         )}
         <div className={styles.svg}>
            <div className={styles.logoWrapper}>
               <div className={styles.logo}></div>
               <div className={styles.title}>
                  <Parragraph align='center' bold size='large' text='Welcome to scholar' />
               </div>
               <div className={styles.desc}>
                  <Parragraph align='center' size='large' text={`test`} />
               </div>
            </div>
            <BackgroundOne />
         </div>
         {stepProcess === 0 && (
            <EmailVerification
               redirect='login'
               cta={{ handleResult: (result: number) => handleUpdateStep(result) }}
            />
         )}
         {stepProcess === 1 && (
            <OTCVerification
               redirect='login'
               cta={{ handleResult: (result: number) => handleUpdateStep(result) }}
            />
         )}

         {stepProcess === 2 && (
            <ChangePassword
               USER_ID='1'
               redirect='login'
               cta={{ handleResult: (result: number) => handleUpdateStep(result) }}
            />
         )}
         {stepProcess === 3 && <Primary type='2' title='Back to login' href='/login' />}
      </div>
   );
};
