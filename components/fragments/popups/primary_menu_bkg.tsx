// components
import { PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR } from "../../../constants/tokens";
import { CloseContent } from "../buttons/close_content";
import { Header } from "../Typography/header";

// styles
import styles from "./primary_menu_bkg.module.css";

type TPrimaryMenuBkgProps = {
   className?: string;
   children: any;
   color?: string;
   title?: string;
   customColors?: {
      light: string;
      dark: string;
   };
   cta: {
      handleClose: () => void;
   };
};

export const PrimaryMenuBkg = ({
   className = "",
   children,
   color,
   customColors,
   cta,
   title
}: TPrimaryMenuBkgProps) => {
   // determine the background color
   let bkgColor: string = "";

   switch (color) {
      case "1":
         bkgColor = "linear-gradient(-10deg, #B293FE, #7350EC)";
         break;

      case "2":
         bkgColor = "linear-gradient(-10deg, #FF8655,  #FF3269)";
         break;

      case "3":
         bkgColor = "linear-gradient(-10deg, #5C5470,  #38304B)";
         break;

      case "primary":
         bkgColor = PRIMARY_COLOR;
         break;

      case "secondary":
         bkgColor = SECONDARY_COLOR;
         break;

      case "ternary":
         bkgColor = THIRD_COLOR;
         break;

      default:
         bkgColor = `linear-gradient(-10deg, ${customColors?.light}, ${customColors?.dark})`;
         break;
   }

   return (
      <div className={`${styles.mainWrapper} ${className}`} style={{ background: bkgColor }}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: cta.handleClose }} size='2.5rem' />
         </div>
         {title && (
            <div className={styles.title}>
               <Header size='main' type={3} text={title} />{" "}
            </div>
         )}
         <div className={styles.contentWrapper}>{children}</div>
      </div>
   );
};
