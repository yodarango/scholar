// components
import { Wigo } from "../components/templates/wigo";

// styles
import styles from "./page_global.module.css";

const Index = () => {
   return (
      <main className={styles.mainWrapper}>
         <Wigo />
         <div className='spacer-page-bottom'></div>
      </main>
   );
};

export default Index;
