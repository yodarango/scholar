// comps
import { CloseContent } from "../buttons/close_content";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./notification.module.css";

type notificatrionPopupProps = {
   title: string;
   jsxContent?: JSX.Element;
   body?: string;
   type: string;
   cta: {
      handleClose: () => void;
   };
   customColor?: {
      light: string;
      dark: string;
   };
};
export const Notification = ({
   title,
   cta,
   type,
   body,
   customColor,
   jsxContent
}: notificatrionPopupProps) => {
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

   return (
      <>
         {!customColor && body && (
            <div className={`${styles.mainWrapper} ${notificationType}`}>
               <div className={styles.close}>
                  <CloseContent
                     cta={{ handleClick: cta.handleClose }}
                     color={type === "2" || type === "3" ? "#2a2438" : undefined}
                  />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' />
               </div>
               <Parragraph text={body} size='small' />
            </div>
         )}

         {customColor && body && (
            <div
               className={`${styles.mainWrapper}`}
               style={{
                  backgroundImage: `linear-gradient(-10deg,${customColor.light}, ${customColor.dark})`
               }}>
               <div className={styles.close}>
                  <CloseContent
                     cta={{ handleClick: cta.handleClose }}
                     color={type === "2" || type === "3" ? "#2a2438" : undefined}
                  />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' />
               </div>
               <Parragraph text={body} size='small' />
            </div>
         )}

         {/* ----------------------- if the popup contians JSX Elemnts ------------- */}
         {!customColor && jsxContent && (
            <div className={`${styles.mainWrapper} ${notificationType}`}>
               <div className={styles.close}>
                  <CloseContent
                     cta={{ handleClick: cta.handleClose }}
                     color={type === "2" || type === "3" ? "#2a2438" : undefined}
                  />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' />
               </div>
               <div>{jsxContent}</div>
            </div>
         )}

         {customColor && jsxContent && (
            <div
               className={`${styles.mainWrapper}`}
               style={{
                  backgroundImage: `linear-gradient(-10deg,${customColor.light}, ${customColor.dark})`
               }}>
               <div className={styles.close}>
                  <CloseContent
                     cta={{ handleClick: cta.handleClose }}
                     color={type === "2" || type === "3" ? "#2a2438" : undefined}
                  />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' />
               </div>
               <div>{jsxContent}</div>
            </div>
         )}
      </>
   );
};
