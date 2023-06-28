import { WelcomeTemplate } from "../../components/templates/users/welcome";
import styles from "../page_global.module.css";

const welcome = () => {
   return (
      <div className={styles.mainWrapper}>
         <WelcomeTemplate />
         <div className='spacer-page-bottom'></div>
         <div className='spacer-page-bottom'></div>
         <div className='spacer-page-bottom'></div>
         <div className='spacer-page-bottom'></div>
      </div>
   );
};

export default welcome;
