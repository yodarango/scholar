// react
import { useState } from "react";

// styles
import styles from "./parragraph.module.css";

type TParragraphProps = {
   size: string;
   text: string | number | JSX.Element;
   align?: string;
   bold?: boolean;
   inline?: boolean;
   italics?: boolean;
   color?: string;
   lineHieght?: string;
   quiet?: boolean;
};

export const Parragraph = ({
   size,
   quiet,
   text,
   align,
   color,
   inline,
   italics,
   bold,
   lineHieght
}: TParragraphProps) => {
   // states
   let fontSize: string = "";
   let fontAlign: string = "";
   let fontColor = color ? color : quiet ? "#5C5470" : "#F1EAFF";
   let fontLineHeight = lineHieght ? lineHieght : "1.6em";

   // determine the size
   switch (size) {
      case "xxsmall":
         fontSize = styles.xxsmall;
         break;
      case "xsmall":
         fontSize = styles.xsmall;
         break;
      case "small":
         fontSize = styles.small;
         break;
      case "main":
         fontSize = styles.main;
         break;
      case "large":
         fontSize = styles.large;
         break;
      case "xlarge":
         fontSize = styles.xlarge;
         break;
   }

   // determine the alignment
   switch (align) {
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

   return (
      <>
         {!inline && !italics && !bold && (
            <p
               className={`${styles.parragraph} ${fontSize} ${fontAlign}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </p>
         )}

         {inline && !italics && !bold && (
            <span
               className={`${styles.parragraph} ${styles.inline} ${fontSize} ${fontAlign}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </span>
         )}

         {italics && (
            <i
               className={`${styles.parragraph} ${fontSize} ${fontAlign}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </i>
         )}

         {bold && (
            <b
               className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                  bold ? styles.bold : ""
               }`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </b>
         )}
      </>
   );
};
