import { GridPrimary } from "../../../layouts/scrollers/grid_primary";

// styles
import styles from "./index.module.css";

// types
import { TCommentary } from "../../../types/posts";
import { CommentariesAll } from "../../../templates/content/commentaries_all";

type TIndexProps = {
   commentaries: TCommentary[];
};
const Index = ({ commentaries }: TIndexProps) => {
   return (
      <div className={styles.mainWrapper}>
         <CommentariesAll commentaries={[]} />
      </div>
   );
};

export default Index;
