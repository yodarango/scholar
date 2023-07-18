import { useEffect } from "react";

// comps
import { CommentaryTextEditor } from "../../../../components/templates/content/commentary_text_editor";
import { REQUEST_TYPE_IS_NEW_COMMENTARY } from "../../../../helpers/functions/posts/content_post";

import styles from "./index.module.css";
import global from "../../../page_global.module.css";
import { UseIsAuth } from "../../../../hooks/use_check_auth";
import HeadContent from "../../../../SEO/head_content";
import Head from "next/head";

const NewCommentary = () => {
   useEffect(() => {
      // get the user data
   }, []);
   return (
      <UseIsAuth redirect='/login'>
         <Head key='new-commentary-page'>
            <HeadContent title='Shine your light' />
         </Head>
         <div className={`${styles.mainWrapper} ${global.mainWrapper}`}>
            <CommentaryTextEditor
               includeClose
               closePath='/'
               verseId=''
               withSticker={true}
               requestType={REQUEST_TYPE_IS_NEW_COMMENTARY}
            />
         </div>
      </UseIsAuth>
   );
};

export default NewCommentary;
