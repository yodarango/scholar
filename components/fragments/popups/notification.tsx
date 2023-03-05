// comps
import { FONT_COLOR, PRIMARY_COLOR } from "../../../constants/tokens";
import { CloseContent } from "../buttons/close_content";
import { Icon } from "../chunks/icons";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./notification.module.css";

type notificatrionPopupProps = {
   cta: {
      handleClose: () => void;
   };
   customColor?: {
      light: string;
      dark: string;
   };
   jsxContent?: JSX.Element;
   textColor?: string;
   title: string;
   body?: string;
   type: string;
};
export const Notification = ({
   customColor,
   jsxContent,
   textColor,
   title,
   type,
   body,
   cta
}: notificatrionPopupProps) => {
   // determine the card type
   let notificationType: string = "";
   let iconColor: string = FONT_COLOR;
   let icon: string = "";

   switch (type) {
      case "1":
         notificationType = styles.info;
         icon = "info";
         break;

      case "2":
         notificationType = styles.safe;
         iconColor = PRIMARY_COLOR;
         icon = "checkmark";
         break;

      case "3":
         notificationType = styles.warning;
         iconColor = PRIMARY_COLOR;
         icon = "warning_triangle";
         break;

      case "4":
         notificationType = styles.danger;
         icon = "close";
         break;
   }

   return (
      <>
         {/* The default card that gets passed rendered  */}
         {!customColor && body && (
            <div className={`${styles.mainWrapper}`}>
               <div className={styles.close}>
                  <CloseContent cta={{ handleClick: cta.handleClose }} color={FONT_COLOR} />
               </div>

               <div className={`${notificationType} ${styles.iconContainer}`}>
                  <Icon name={icon} color={iconColor} />
               </div>
               <div className={styles.contentContainer}>
                  <div className={styles.title}>
                     <Header
                        type={2}
                        text={title}
                        size='main'
                        lineHieght='.9em'
                        color={FONT_COLOR}
                     />
                  </div>
                  <Parragraph text={body} size='small' />
               </div>
            </div>
         )}

         {/* if custom colors for the card are passed down in props */}
         {customColor && body && (
            <div
               className={`${styles.mainWrapper}`}
               style={{
                  backgroundImage: `linear-gradient(-10deg,${customColor.light}, ${customColor.dark})`
               }}>
               <div className={styles.close}>
                  <CloseContent cta={{ handleClick: cta.handleClose }} color={FONT_COLOR} />
               </div>
               <div className={styles.title}>
                  <Header type={2} text={title} size='main' lineHieght='.9em' color={FONT_COLOR} />
               </div>
               <Parragraph text={body} size='small' color={FONT_COLOR} />
            </div>
         )}

         {/*  if the popup contains JSX Elements  */}
         {!customColor && jsxContent && (
            <div className={`${styles.mainWrapper} ${notificationType}`}>
               <div className={styles.close}>
                  <CloseContent cta={{ handleClick: cta.handleClose }} color={FONT_COLOR} />
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
                  <CloseContent cta={{ handleClick: cta.handleClose }} color={FONT_COLOR} />
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
