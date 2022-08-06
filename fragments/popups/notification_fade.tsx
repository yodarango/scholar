/*********************************************************************************************
 self closing popup. It triggers a timeout that removes it from the dom after 1600ms
/*********************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./notification_fade.module.css";

type notificatrionPopupProps = {
   jsxContent?: JSX.Element;
   body?: string;
   type: string;
   customColor?: {
      light: string;
      dark: string;
   };
};
export const NotificationFade = ({
   type,
   body,
   customColor,
   jsxContent
}: notificatrionPopupProps) => {
   // state
   const [displayComponent, setdisplayComponent] = useState(true);

   // determine the card type
   let notificationType: string = "";

   switch (type) {
      case "1":
         notificationType = styles.info;
         break;

      case "2":
         notificationType = styles.safe;
         break;

      case "3":
         notificationType = styles.warning;
         break;

      case "4":
         notificationType = styles.danger;
         break;
   }

   // set the timer to stop displaing the component
   useEffect(() => {
      setTimeout(() => {
         setdisplayComponent(false);
      }, 2600);
   });
   return (
      <>
         {displayComponent && (
            <>
               {!customColor && body && (
                  <div className={`${styles.mainWrapper} ${notificationType}`}>
                     <Parragraph text={body} size='small' />
                  </div>
               )}

               {customColor && body && (
                  <div
                     className={`${styles.mainWrapper}`}
                     style={{
                        backgroundImage: `linear-gradient(-10deg,${customColor.light}, ${customColor.dark})`
                     }}>
                     <Parragraph text={body} size='small' />
                  </div>
               )}

               {/* ----------------------- if the popup contians JSX Elemnts ------------- */}
               {!customColor && jsxContent && (
                  <div className={`${styles.mainWrapper} ${notificationType}`}>
                     <div>{jsxContent}</div>
                  </div>
               )}

               {customColor && jsxContent && (
                  <div
                     className={`${styles.mainWrapper}`}
                     style={{
                        backgroundImage: `linear-gradient(-10deg,${customColor.light}, ${customColor.dark})`
                     }}>
                     <div>{jsxContent}</div>
                  </div>
               )}
            </>
         )}
      </>
   );
};
