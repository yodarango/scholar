import { useEffect } from "react";

// comps
import { ThoughtTextEditor } from "../../../../components/templates/content/thought_text_editor";

// styles
import styles from "./index.module.css";

const NewThought = () => {
   useEffect(() => {
      // get the user data
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <ThoughtTextEditor
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
         />
      </div>
   );
};

export default NewThought;
