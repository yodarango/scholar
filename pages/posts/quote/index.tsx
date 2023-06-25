// components
import { useRouter } from "next/router";
import { PrimaryStackHeader } from "../../../components/layouts/stacks/headers/primary_stack_header";
import { QuotesAll } from "../../../components/templates/content/quotes_all";

// styles
import styles from "./index.module.css";

const Index = () => {
   const router = useRouter();

   return (
      <div className={styles.mainWrapper}>
         <PrimaryStackHeader title='Quotes' cta={{ handleClose: () => router.push("/") }} />
         <div className={styles.posts}>
            <QuotesAll />
         </div>
      </div>
   );
};

export default Index;
