// components
import { PrimaryStackHeader } from "../../../layouts/stacks/headers/primary_stack_header";
import { ThoughtsAll } from "../../../templates/content/thoughts_all";

// styles
import styles from "./index.module.css";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <PrimaryStackHeader title='Thoughts' />
         <div className={styles.posts}>
            <ThoughtsAll />
         </div>
      </div>
   );
};

export default Index;
