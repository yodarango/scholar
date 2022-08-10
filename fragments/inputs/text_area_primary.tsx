// TODO: text area grow is working for strech, now make it work for shrink

import { useRef, useState } from "react";

import styles from "./text_area_primary.module.css";

type TTextEditorTextAreaProps = {
   defaultValue: string;
   placeHolder: string;
   maxLength: number;
   cta: {
      handleCurrentValue: (body: string) => void;
   };
};
export const TextAreaPrimary = ({
   defaultValue,
   placeHolder,
   maxLength,
   cta
}: TTextEditorTextAreaProps) => {
   // state
   const [currTextAreaHeight, setcurrTextAreaHeight] = useState<string>("10rem");
   // ref
   const textArea = useRef<HTMLTextAreaElement>(null);

   // resize text area & callback to send onChange event so parent has access totext area body
   const resizeTextArea = () => {
      if (textArea?.current) {
         cta.handleCurrentValue(textArea.current.value);
         const currSscrollHeight = textArea.current.scrollHeight;
         const textAreaHeight = currTextAreaHeight.replace("rem", "");
         const heightInt = parseInt(textAreaHeight);

         if (heightInt < currSscrollHeight && heightInt < 25) {
            setcurrTextAreaHeight(`${currSscrollHeight / 10}rem`);
         } else if (heightInt > currSscrollHeight && heightInt > 10) {
            setcurrTextAreaHeight(`${currSscrollHeight / 10}rem`);
         }
         console.log(textAreaHeight, currSscrollHeight);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         <textarea
            style={{ height: currTextAreaHeight }}
            maxLength={maxLength}
            className={styles.textArea}
            ref={textArea}
            defaultValue={defaultValue}
            placeholder={placeHolder}
            onChange={resizeTextArea}></textarea>
      </div>
   );
};
