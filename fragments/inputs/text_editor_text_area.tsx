import { useRef } from "react";

// styles
import styles from "./text_editor_text_area.module.css";

type TTextEditorTextAreaProps = {
   defaultValue: string | null;
   placeHolder: string;
   maxLength: number;
   cta: {
      handleCurrentValue: (body: string) => void;
   };
};

export const TextEditorTextArea = ({
   defaultValue,
   placeHolder,
   maxLength,
   cta
}: TTextEditorTextAreaProps) => {
   // ref
   const textArea = useRef<HTMLTextAreaElement>(null);

   // callback to send onChange event so parent has access totext area ody
   const currentValue = () => {
      if (textArea?.current) {
         cta.handleCurrentValue(textArea.current.value);
      }
   };
   return (
      <div className={styles.mainWrapper}>
         <textarea
            maxLength={maxLength}
            className={styles.textArea}
            ref={textArea}
            defaultValue={defaultValue ? defaultValue : ""}
            placeholder={placeHolder}
            onChange={currentValue}></textarea>
      </div>
   );
};
