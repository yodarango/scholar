import { useEffect } from "react";

// comps
import { CommentaryTextEditor } from "../../../../components/templates/content/commentary_text_editor";

import styles from "./index.module.css";

const NewCommentary = () => {
   useEffect(() => {
      // get the user data
   }, []);
   return (
      <div className={styles.mainWrapper}>
         <CommentaryTextEditor
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
         />
      </div>
   );
};

export default NewCommentary;
