import { GeneralSettings } from "../../../components/templates/account/general_settings";
import styles from "./index.module.css";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <GeneralSettings />
      </div>
   );
};

export default Index;
