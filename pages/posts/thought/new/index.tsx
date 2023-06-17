import { useEffect } from "react";

// comps
import { ThoughtTextEditor } from "../../../../components/templates/content/thought_text_editor";
import { REQUEST_TYPE_IS_NEW_THOUGHT } from "../../../../helpers/functions/posts/content_post";

// styles
import styles from "./index.module.css";
import { UseIsAuth } from "../../../../hooks/use_check_auth";

const NewThought = () => {
   useEffect(() => {
      // get the user data
   }, []);

   return (
      <UseIsAuth redirect='/login'>
         <div className={styles.mainWrapper}>
            <ThoughtTextEditor
               requestType={REQUEST_TYPE_IS_NEW_THOUGHT}
               avatar='/images/user_avatar'
               username='Username'
               userAuthority={1}
               userId='123'
            />
         </div>
      </UseIsAuth>
   );
};

export default NewThought;
