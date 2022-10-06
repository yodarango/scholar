// components
import { PrimaryStackHeader } from "../../../layouts/stacks/headers/primary_stack_header";
import { QuotesAll } from "../../../templates/content/quotes_all";

// styles
import styles from "./index.module.css";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <PrimaryStackHeader title='Quotes' />
         <div className={styles.posts}>
            <QuotesAll />
         </div>
      </div>
   );
};

export default Index;
