import { useEffect, useState } from "react";

// components
import { IconButton } from "../buttons/icon_button";
import { TextAreaPrimary } from "./text_area_primary";

// styles
import styles from "./post_comment_text_area.module.css";

type TPostCommentTextAreaProps = {
   cta: {
      handleValue: (value: string) => void;
   };
};

export const PostCommentTextArea = ({ cta }: TPostCommentTextAreaProps) => {
   const [currentInputValue, setcurrentInputValue] = useState<string>("");
   const [resetInput, setresetInput] = useState<number>(0);
   const [displayInput, setdisplayInput] = useState(true);

   const handlePostComment = () => {
      // post to db and send the value to the parent after success to add it to the comentary array
      cta.handleValue(currentInputValue);

      // hide inout
      setdisplayInput(false);

      // call useEffectto reset
      setresetInput(resetInput + 1);
   };

   // reset input
   useEffect(() => {
      // display again
      setdisplayInput(true);
   }, [resetInput]);

   return (
      <>
         {displayInput && (
            <div className={styles.mainWrapper}>
               <div className={styles.textArea}>
                  <TextAreaPrimary
                     height='5rem'
                     maxHeight={15}
                     defaultValue=''
                     placeHolder='Comment...'
                     maxLength={150}
                     cta={{ handleCurrentValue: (value: string) => setcurrentInputValue(value) }}
                  />
               </div>
               <div onClick={handlePostComment}>
                  <IconButton icon='checkmark' backgroundColor='1' />
               </div>
            </div>
         )}
      </>
   );
};
