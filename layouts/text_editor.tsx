import { useRouter } from "next/router";

// components

//styles
import styles from "./text_editor.module.css";
import { TextEditorVerseSelection } from "../fragments/text_editor_verse_selection";
import { TextEditorTextArea } from "../fragments/inputs/text_editor_text_area";
import { TextEditorActions } from "./text_editor_actions";
import { CloseContent } from "../fragments/buttons/close_content";

// helpers / types

type TTextEditorProps = {
   content: string;
   postImage: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   postReferences: string[];
};

export const TextEditor = ({
   content,
   postImage,
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   postReferences
}: TTextEditorProps) => {
   // states

   // router
   const router = useRouter();

   return (
      <div className={styles.wrapper}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: () => router.back() }} />
         </div>
         <div className={styles.verseSelection}>
            <TextEditorVerseSelection />
         </div>
         <div className={styles.textArea}>
            <TextEditorTextArea
               defaultValue=''
               placeHolder='Commentary...'
               maxLength={2500}
               cta={{ handleCurrentValue: () => {} }}
            />
         </div>
         <div className={styles.bottomGridHolder}></div>
         <div className={styles.editorActions}>
            <TextEditorActions
               content={content}
               postImage={postImage}
               userAuthority={userAuthority}
               userId={userId}
               username={username}
               avatar={avatar}
               postPostedOnDate={postPostedOnDate}
               postCreatedDate={postCreatedDate}
               postCategory={postCategory}
               postReferences={postReferences}
               cta={{
                  handleCategorySelection: () => {},
                  handlePrivacySelection: () => {},
                  handleRefVerseSelection: () => {}
               }}
            />
         </div>
      </div>
   );
};
