// components
import { GridPrimary } from "../../../layouts/scrollers/grid_primary";

// styles
import styles from "./index.module.css";

// types
import { TCommentary } from "../../../types/posts";
import { CommentariesAll } from "../../../templates/content/commentaries_all";
import { PrimaryStackHeader } from "../../../layouts/stacks/headers/primary_stack_header";

type TIndexProps = {
   commentaries: TCommentary[];
};
const Index = ({ commentaries }: TIndexProps) => {
   return (
      <div className={styles.mainWrapper}>
         <PrimaryStackHeader title='Commentaries' />
         <div className={styles.posts}>
            <CommentariesAll commentaries={[]} />
         </div>
      </div>
   );
};

export default Index;
