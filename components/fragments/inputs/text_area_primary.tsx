/**************************************************************************************** 
Renders a resizeable text area. All units are in rem
****************************************************************************************/

import { useRef, useState } from "react";

// styles
import styles from "./text_area_primary.module.css";

type TTextEditorTextAreaProps = {
   fontSize?: string;
   darkText?: boolean;
   textColor?: string;
   bold?: boolean;
   alignment?: string;
   transparent?: boolean;
   defaultValue?: string;
   placeHolder: string;
   maxLength: number;
   height?: string;
   maxHeight?: number | string;
   border?: String;
   noResize?: boolean;
   cta: {
      handleCurrentValue: (body: string) => void;
   };
};
export const TextAreaPrimary = ({
   fontSize,
   darkText = false,
   textColor,
   bold,
   alignment,
   transparent = false,
   defaultValue,
   placeHolder,
   maxLength,
   height = "10rem",
   maxHeight = 25,
   border,
   noResize,
   cta
}: TTextEditorTextAreaProps) => {
   // state
   const [currTextAreaHeight, setcurrTextAreaHeight] = useState<string>(height);
   const [scrollableHeight, setscrollableHeight] = useState<number>(0);

   // ref
   const textArea = useRef<HTMLTextAreaElement>(null);

   let fontSz: string = "";
   let fontAlign: string = "";

   // determine the size
   switch (fontSize) {
      case "xxsmall":
         fontSz = styles.xxsmall;
         break;
      case "xsmall":
         fontSz = styles.xsmall;
         break;
      case "small":
         fontSz = styles.small;
         break;
      case "main":
         fontSz = styles.main;
         break;
      case "large":
         fontSz = styles.large;
         break;
      case "xlarge":
         fontSz = styles.xlarge;
         break;
      case "xxlarge":
         fontSz = styles.xxlarge;
         break;
      case "xxxlarge":
         fontSz = styles.xxxlarge;
         break;
   }

   // determine the alignment
   switch (alignment) {
      case "right":
         fontAlign = styles.right;
         break;
      case "center":
         fontAlign = styles.center;
         break;
      case "justify":
         fontAlign = styles.justify;
         break;
   }

   // check if there is a border
   const borderStyles =
      border === "top" ? styles.borderTop : border === "bottom" ? styles.borderBottom : "";
   // resize text area & callback to send onChange event so parent has access to text area body
   const resizeTextArea = () => {
      if (noResize) return;
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
         {!transparent && (
            <textarea
               style={{ height: currTextAreaHeight, color: textColor }}
               maxLength={maxLength}
               className={`${styles.textArea} ${fontAlign} ${fontSz} ${
                  bold && styles.bold
               } ${border}`}
               ref={textArea}
               defaultValue={defaultValue}
               placeholder={placeHolder}
               onChange={resizeTextArea}></textarea>
         )}
         {transparent && (
            <textarea
               style={{ height: currTextAreaHeight, color: textColor }}
               maxLength={maxLength}
               className={`${styles.textArea} ${fontAlign} ${styles.transparent} ${
                  darkText && styles.darkText
               } ${fontSz} ${bold && styles.bold} ${borderStyles}`}
               ref={textArea}
               defaultValue={defaultValue}
               placeholder={placeHolder}
               onChange={resizeTextArea}></textarea>
         )}
      </div>
   );
};
