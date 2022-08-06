/*********************************************************************************************
 self closing popup. It triggers a timeout that removes it from the dom after 2600ms. The 
 component depends in a prop called render which the parent updates to signify every time the 
 the component should "render". Because the useEffect depends on the "render" proop it needs
 to be a different value every time is passed. A helpful solution is passing an updated number
/*********************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./notification_fade.module.css";

type notificatrionPopupProps = {
   render: number;
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
   jsxContent,
   render
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

   // control the notification appareance
   useEffect(() => {
      // if the notification is OFF turne it on and automate it to turn off in 2600ms
      if (displayComponent === false) {
         setdisplayComponent(true);
         setTimeout(() => {
            setdisplayComponent(false);
         }, 2600);
      } else {
         // if it is already ON set to false and imediately turn it on again
         setdisplayComponent(false);
         setTimeout(() => {
            setdisplayComponent(true);
         }, 100);
      }
   }, [render]);

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
