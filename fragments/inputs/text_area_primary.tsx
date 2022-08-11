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

         if (heightInt < scrollableHeight && heightInt < 25) {
            setcurrTextAreaHeight(`${scrollableHeight}rem`);
         } else if (heightInt >= scrollableHeight && heightInt > 10) {
            setscrollableHeight(0);
            heightInt = heightInt - 2.6;
            setcurrTextAreaHeight(`${heightInt}rem`);
         }
         console.log(heightInt, scrollableHeight);
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
