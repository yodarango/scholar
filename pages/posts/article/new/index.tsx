// comps
import { ThoughtTextEditor } from "../../../../components/templates/content/thought_text_editor";
import { REQUEST_TYPE_IS_NEW_THOUGHT } from "../../../../helpers/functions/posts/content_post";

// styles
import styles from "./index.module.css";
import global from "../../../page_global.module.css";
import { UseIsAuth } from "../../../../hooks/use_check_auth";
import { loggedInUser } from "../../../../helpers/auth/get-loggedin-user";
import Head from "next/head";
import HeadContent from "../../../../SEO/head_content";

const NewThought = () => {
   const user = loggedInUser();

   return (
      <UseIsAuth redirect='/login'>
         <Head key='new-article-page'>
            <HeadContent title='New article' />
         </Head>
         <div className={`${styles.mainWrapper} ${global.mainWrapper}`}>
            <ThoughtTextEditor
               requestType={REQUEST_TYPE_IS_NEW_THOUGHT}
               avatar={user?.avatar || "/images/user_avatars/males/10.png"}
               username='Username'
               userAuthority={1}
               userId='123'
            />
         </div>
      </UseIsAuth>
   );
};

export default NewThought;
