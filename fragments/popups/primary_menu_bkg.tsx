// components
import { CloseContent } from "../buttons/close_content";
import { Header } from "../Typography/header";

// styles
import styles from "./primary_menu_bkg.module.css";

type TPrimaryMenuBkgProps = {
   content: any;
   color: string;
   title?: string;
   cta: React.MouseEventHandler<HTMLDivElement>;
   customColors?: {
      light: string;
      dark: string;
   };
};

export const PrimaryMenuBkg = ({
   content,
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

      default:
         bkgColor = `linear-gradient(-10deg, ${customColors?.light}, ${customColors?.dark})`;
         break;
   }

   return (
      <div className={styles.mainWrapper} style={{ backgroundImage: bkgColor }}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: cta }} size='2.5rem' />
         </div>
         {title && (
            <div className={styles.title}>
               <Header size='main' type={3} text={title} />{" "}
            </div>
         )}
         <div className={styles.contentWrapper}>{content}</div>
      </div>
   );
};
