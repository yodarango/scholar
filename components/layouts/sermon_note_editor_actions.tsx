import { useRef, useState } from "react";

// components
import { Primary } from "../fragments/buttons/primary";
import { Secondary } from "../fragments/buttons/secondary";
import { CategorySelection } from "../fragments/chunks/category_selection";
import { InputPrimary } from "../fragments/inputs/input_primary";
import { Notification } from "../fragments/popups/notification";
import Portal from "../hoc/potal";

// styles
import styles from "./sermon_note_editor_actions.module.css";

// helpers
import { handleUploadFile } from "../../helpers/content/file_upload";

// data
import { errorMessages } from "../../data/error_messages";

type TSermonNoteEditorActionsProps = {
   sermonTitle: string;
   categoryId: string;
   cta: {
      handleUploadedFile: (value: object) => void;
   };
};

export const SermonNoteEditorActions = ({
   sermonTitle,
   categoryId,
   cta
}: TSermonNoteEditorActionsProps) => {
   // states
   const [notification, setnotification] = useState<boolean>(false);
   const [title, setTitle] = useState<string>(sermonTitle);
   const [category, setcategory] = useState<string>(categoryId);

   const fileUploadInput = useRef<HTMLInputElement>(null);

   // handle the file upload
   const handleSelectFile = (file: any) => {
      // success
      const successfulUpload = (file: any) => {
         cta.handleUploadedFile(file);
      };

      //fail
      const failUpload = () => {
         setnotification(true);
         cta.handleUploadedFile({ name: "" });
      };

      // call the file uploader function
      handleUploadFile(file, 4000000, successfulUpload, failUpload);
   };

   // handle post to db and update the file name
   const handlePost = () => {};

   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {notification && (
               <Notification
                  title={errorMessages.posts.fileTooBig.title}
                  type='4'
                  body={errorMessages.posts.fileTooBig.body("4MB")}
                  cta={{ handleClose: () => setnotification(false) }}
               />
            )}
         </Portal>
         <div className={styles.search}>
            <InputPrimary
               type='text'
               value={sermonTitle}
               maxL={150}
               placeholder='Enter title'
               cta={{ handleValue: (title: string) => setTitle(title) }}
            />
         </div>
         <div className={styles.actions}>
            <div className={styles.category}>
               <CategorySelection
                  categoryId={categoryId}
                  cta={{ handleSelection: (cat: string) => setcategory(cat) }}
               />
            </div>
            <div className={styles.chooseFile}>
               <Secondary
                  icon='📂'
                  title='Choose file'
                  type='1'
                  cta={{ handleClick: () => fileUploadInput.current?.click() }}
               />
               <input
                  ref={fileUploadInput}
                  id={"sermon-notes"}
                  type='file'
                  accept={`.doc, .docx, .pdf`}
                  className={styles.fileInput}
                  onChange={handleSelectFile}
               />
            </div>
         </div>
         <div className={styles.button}>
            <Primary title='Upload' type='1' cta={{ handleClick: handlePost }} />
         </div>
      </div>
   );
};
