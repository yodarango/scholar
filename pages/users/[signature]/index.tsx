// comps
import { Profile } from "../../../components/templates/account/profile";
import { UseIsAuth } from "../../../hooks/use_check_auth";

// styles
import styles from "./index.module.css";

const Me = () => {
   return (
      <UseIsAuth redirect='/login'>
         <div className={styles.mainWrapper}>
            <Profile username='user' />
         </div>
      </UseIsAuth>
   );
};
export default Me;
