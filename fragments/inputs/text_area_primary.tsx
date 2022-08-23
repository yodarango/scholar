import { useRef, useState } from "react";

// styles
import styles from "./text_area_primary.module.css";

type TTextEditorTextAreaProps = {
   defaultValue: string;
   placeHolder: string;
   maxLength: number;
   height?: string;
   maxHeight?: number;
   cta: {
      handleCurrentValue: (body: string) => void;
   };
};
export const TextAreaPrimary = ({
   defaultValue,
   placeHolder,
   maxLength,
   height = "10rem",
   maxHeight = 25,
   cta
}: TTextEditorTextAreaProps) => {
   // state
   const [currTextAreaHeight, setcurrTextAreaHeight] = useState<string>(height);
   const [scrollableHeight, setscrollableHeight] = useState<number>(0);

   // ref
   const textArea = useRef<HTMLTextAreaElement>(null);

   // resize text area & callback to send onChange event so parent has access totext area body
   const resizeTextArea = () => {
      if (textArea?.current) {
         cta.handleCurrentValue(textArea.current.value);
         setscrollableHeight(textArea.current.scrollHeight / 10);
         const textAreaHeight = currTextAreaHeight.replace("rem", "");
         let heightInt = parseInt(textAreaHeight);

         if (heightInt < scrollableHeight && heightInt < maxHeight) {
            setcurrTextAreaHeight(`${scrollableHeight}rem`);
         } else if (heightInt >= scrollableHeight && heightInt > 10) {
            setscrollableHeight(0);
            heightInt = heightInt - 2.6;
            setcurrTextAreaHeight(`${heightInt}rem`);
         }
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
