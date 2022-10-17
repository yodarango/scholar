import { Reducer, useReducer, useState } from "react";
import { useRouter } from "next/router";

// components
import { CloseContent } from "../../fragments/buttons/close_content";
import { SermonNoteEditorActions } from "../../layouts/sermon_note_editor_actions";

// styles
import styles from "./sermon_note_editor.module.css";
import { Parragraph } from "../../fragments/Typography/parragraph";

type TSermonNoteEditorProps = {
   ID?: string;
   category_tags?: string;
   title?: string;
   file_url?: string;
   renderClose: boolean;
};

export const SermonNoteEditor = ({
   renderClose,
   title = "",
   category_tags = "",
   ID = "",
   file_url = ""
}: TSermonNoteEditorProps) => {
   // state
   const [fileUrl, setfileUrl] = useState<string>(file_url);

   // router
   const router = useRouter();

   return (
      <div className={styles.mainWrapper}>
         {renderClose && (
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: () => router.push("/quote") }} />
            </div>
         )}
         <section className={styles.contentWrapper}>
            <div className={styles.editor}>
               <div className={styles.editorImage}></div>
               <div className={styles.fileUrl}>
                  {fileUrl && (
                     <Parragraph text={`Your file ${fileUrl}`} size='main' color={"#7FDC7D"} />
                  )}
                  {!fileUrl && <Parragraph text={`Upload your file`} size='main' />}
               </div>
            </div>
            <div className={styles.actions}>
               <SermonNoteEditorActions
                  sermonTitle={title}
                  categoryId={category_tags}
                  cta={{
                     handleUploadedFile: (file: any) => setfileUrl(file.name)
                  }}
               />
            </div>
         </section>
      </div>
   );
};
