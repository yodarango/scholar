import React from "react";
import styles from "./feedback_mascot.module.css";
import { Parragraph } from "../../fragments/Typography/parragraph";

type TEmptyProps = {
   size?: "small" | "medium" | "large";
};
export const Error = ({ size = "medium" }: TEmptyProps) => {
   let s: string = "";
   switch (size) {
      case "small":
         s = styles.sizeSmall;
         break;

      case "medium":
         s = styles.sizeMedium;
         break;

      case "large":
         s = styles.sizeLarge;
         break;
   }

   return (
      <div>
         <div className={`${styles.imgWrapper} ${s} `}>
            <img src='/images/mascot/min/error.webp' alt='a rooky with an empty box' />
         </div>
         <Parragraph
            align='center'
            size='small'
            text="Sorry something went wrong, I'm working on it."
         />
      </div>
   );
};
