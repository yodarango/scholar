// comps
import { useEffect, useState } from "react";
import { Profile } from "../../components/templates/account/profile";
import { UseCheckAuth } from "../../hooks/use_check_auth";

// styles
import styles from "./me.module.css";

const Me = () => {
   return (
      <div className={styles.mainWrapper}>
         <UseCheckAuth redirect='/login'>
            <Profile username='user' />
         </UseCheckAuth>
      </div>
   );
};
export default Me;
