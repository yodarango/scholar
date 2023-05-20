import { useEffect } from "react";

// comps
import { CommentaryTextEditor } from "../../../../components/templates/content/commentary_text_editor";
import { REQUEST_TYPE_IS_NEW_COMMENTARY } from "../../../../helpers/functions/posts/content_post";

import styles from "./index.module.css";

const NewCommentary = () => {
   useEffect(() => {
      // get the user data
   }, []);
   return (
      <div className={styles.mainWrapper}>
         <CommentaryTextEditor
            includeClose
            closePath='/'
            verseId=''
            withSticker={true}
            requestType={REQUEST_TYPE_IS_NEW_COMMENTARY}
         />
      </div>
   );
};

export default NewCommentary;
