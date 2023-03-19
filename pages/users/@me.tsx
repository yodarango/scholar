// comps
import { useEffect, useState } from "react";
import { Profile } from "../../components/templates/account/profile";
import { useCheckAuth } from "../../hooks/use_check_auth";

// styles
import styles from "./me.module.css";

const Me = () => {
   const [canMoveForward, setcanMoveForward] = useState(false);

   useEffect(() => {
      const { canContinue } = useCheckAuth("/login");

      setcanMoveForward(canContinue);
   }, []);

   return <div className={styles.mainWrapper}>{canMoveForward && <Profile username='user' />}</div>;
};
export default Me;
