import { useRouter } from "next/router";

// components
import { CommentariesAll } from "../../../components/templates/content/commentaries_all";
import { PrimaryStackHeader } from "../../../components/layouts/stacks/headers/primary_stack_header";

// styles
import styles from "./index.module.css";

const Index = () => {
   const router = useRouter();

   return (
      <div className={styles.mainWrapper}>
         <PrimaryStackHeader
            title='Commentaries'
            icon='comment'
            cta={{ handleClose: () => router.back() }}
         />
         <div className={styles.posts}>
            <CommentariesAll />
         </div>
      </div>
   );
};

export default Index;
