import { useState, useEffect } from "react";

// comps
import { AccountVerification } from "../templates/account/account_verification";

// styles
import styles from "./page_global.module.css";

const AccountVerificationPage = () => {
   const [email, setemail] = useState<string>("");

   useEffect(() => {
      // get the email
      setemail("");
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <AccountVerification email={email} />
      </div>
   );
};

export default AccountVerificationPage;
