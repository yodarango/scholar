// components
import { CloseContent } from "../buttons/close_content";

// styles
import styles from "./primary_menu_bkg.module.css";

type TPrimaryMenuBkgProps = {
   content: any;
   color: string;
   cta: React.MouseEventHandler<HTMLDivElement>;
   customColors?: {
      light: string;
      dark: string;
   };
};

export const PrimaryMenuBkg = ({ content, color, customColors, cta }: TPrimaryMenuBkgProps) => {
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

      default:
         bkgColor = `linear-gradient(-10deg, ${customColors?.light}, ${customColors?.dark})`;
         break;
   }

   return (
      <div className={styles.mainWrapper} style={{ backgroundImage: bkgColor }}>
         <div className={styles.close}>
            <CloseContent cta={cta} size='2.5rem' />
         </div>
         <div className={styles.contentWrapper}>{content}</div>
      </div>
   );
};
