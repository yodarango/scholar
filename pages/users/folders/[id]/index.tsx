import React from "react";
import styles from "./index.module.css";
import { CommentariesWFilter } from "../../../../components/layouts/stacks/commentaries_w_filter";
import { useRouter } from "next/router";

const Index = () => {
   const router = useRouter();
   const isSelf = true;
   return (
      <div className={styles.mainWrapper}>
         <CommentariesWFilter isSelf={isSelf} cta={{ handleClose: () => router.back() }} />
      </div>
   );
};

export default Index;
