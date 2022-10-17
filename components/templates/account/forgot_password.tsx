/**************************************************************************************** 
-   This component handles the complete "forgot password" process. 
-   it updates the parent where in the process is at through the cta.handleStepProcess 
    props so the parent can update the correct message and graphics.
****************************************************************************************/
import { useState, useEffect } from "react";

// comps
import { OTCVerification } from "../../layouts/forms/otc_verification";
import { EmailVerification } from "../../layouts/forms/email_verification";
import { ChangePassword } from "../../layouts/forms/change_password";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Primary } from "../../fragments/buttons/primary";
import { Confetti } from "../../fragments/feedback/confetti";
import Portal from "../../hoc/potal";
import { Layer1 } from "../../styles/layouts/backgrounds/layer_1";

// styles
import styles from "./forgot_password.module.css";

// types
type TForgotPasswordFormProps = {
   cta?: {
      handleStepProcess: (step: number) => void;
   };
};

type TStepProcess = {
   title: string;
   message: string;
   graphics: string;
};

// steps messages
const stepMessages = [
   {
      title: "Forgot your credentials ?",
      message: "Please enter the email associated with your account",
      graphics: styles.graphicsOne
   },
   {
      title: "Help us make sure it's you!",
      message: `Please verify the email sent to your email`,
      graphics: styles.graphicsTwo
   },
   {
      title: "Create new password",
      message: "Please make a strong password and keep it private",
      graphics: styles.graphicsThree
   },
   {
      title: "Hooray!",
      message: "You have changed your password, Please try logging in again!",
      graphics: styles.graphicsFour
   }
];

export const ForgotPasswordTemplate = ({ cta }: TForgotPasswordFormProps) => {
   // states
   const [stepProcess, setstepProcess] = useState<number>(0);
   const [currentStepData, setcurrentStepData] = useState<TStepProcess>(stepMessages[0]);

   const handleUpdateStep = (step: number) => {
      console.log("step", step);
      step === 1 && setstepProcess((prev) => prev + 1);
   };

   useEffect(() => {
      stepProcess < 4 && setcurrentStepData(stepMessages[stepProcess]);
   }, [stepProcess]);

   return (
      <div className={styles.mainWrapper}>
         {stepProcess === 3 && (
            <div className={styles.confetti}>
               <Confetti />
            </div>
         )}
         <Layer1 />
         <div className={styles.logoWrapper}>
            {/* switch graphics per step completion */}
            <div className={`${styles.graphics} ${currentStepData.graphics}`}></div>
            <div className={styles.title}>
               <Parragraph align='center' bold size='large' text={currentStepData.title} />
            </div>
            <div className={styles.desc}>
               <Parragraph align='center' size='large' text={currentStepData.message} />
            </div>
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
         {stepProcess === 3 && (
            <div className={styles.redirect}>
               <Primary type='2' title='Back to login' href='/login' />
            </div>
         )}
      </div>
   );
};
