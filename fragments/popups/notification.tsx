// comps
import { CloseContent } from "../buttons/close_content";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./notification.module.css";

type notificatrionPopupProps = {
   title: string;
   body: string | JSX.Element;
   type: string;
   cta: React.MouseEventHandler;
   customColor?: {
      light: string;
      dark: string;
   };
};
export const Notification = ({ title, cta, type, body, customColor }: notificatrionPopupProps) => {
   // determine the card type
   let notificationType: string = "";

   switch (type) {
      case "info":
         notificationType = styles.info;
         break;

      case "safe":
         notificationType = styles.safe;
         break;

      case "warning":
         notificationType = styles.warning;
         break;

      case "danger":
         notificationType = styles.danger;
         break;
   }

   return (
      <>
         {!customColor && (
            <div className={`${styles.mainWrapper} ${notificationType}`}>
               <div className={styles.close}>
                  <CloseContent cta={cta} />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' />
               </div>
               <Parragraph text={body} size='small' lineHieght='.9em' />
            </div>
         )}

         {customColor && (
            <div
               className={`${styles.mainWrapper}`}
               style={{
                  backgroundImage: `linear-gradient(-10deg,${customColor.light}, ${customColor.dark})`
               }}>
               <div className={styles.close}>
                  <CloseContent cta={cta} />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' />
               </div>
               <Parragraph text={body} size='small' lineHieght='.9em' />
            </div>
         )}
      </>
   );
};
