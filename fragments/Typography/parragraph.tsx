// react
import { useState } from "react";

// styles
import styles from "./parragraph.module.css";

type TParragraphProps = {
   size: string;
   text: string | number;
   align?: string;
   bold?: boolean;
   inline?: boolean;
   italics?: boolean;
   color?: string;
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
   bold
}: TParragraphProps) => {
   // states
   let fontSize: string = "";
   let fontAlign: string = "";
   let fontColor = color ? color : "#F1EAFF";

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
         {!inline && (
            <p
               className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                  quiet ? styles.quiet : ""
               }`}
               style={{ color: fontColor }}>
               {text}
            </p>
         )}

         {inline && (
            <span
               className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                  styles.quiet ? styles.quiet : ""
               }`}
               style={{ color: fontColor }}>
               {text}
            </span>
         )}

         {italics && (
            <i
               className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                  quiet ? styles.quiet : ""
               }`}
               style={{ color: fontColor }}>
               {text}
            </i>
         )}

         {bold && (
            <b
               className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                  quiet ? styles.quiet : ""
               } ${bold ? styles.bold : ""}`}
               style={{ color: fontColor }}>
               {text}
            </b>
         )}
      </>
   );
};
