import { useEffect } from "react";

// comps
import { ThoughtTextEditor } from "../../../../templates/content/thought_text_editor";

// styles
import styles from "./index.module.css";

const EditThought = () => {
   useEffect(() => {
      // get the user data
   }, []);
   return (
      <div className={styles.mainWrapper}>
         <ThoughtTextEditor
            titleDefaultValue='My title'
            body={`# Title &nbsp; (link)[www.example.com]`}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
            postPostedOnDate='08/11/22 09:00'
            postCreatedDate='08/11/22 09:00'
            postCategory='YLW'
            postReferences={["1CO.1.1", "MAT.3.2"]}
            postPrivacy={true}
         />
      </div>
   );
};

export default EditThought;
