// this component return a list option for the primary menu, It is composed of a left side icon and a right side description
// There are three kinds of left button types: icon, text and filled color.
// there are two types of right hand description; plain text or jsx

// components
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./menu_primary_option.module.css";

type TMenuPrimaryOptionProps = {
   iconType: string;
   textType: string;
   optionProperties: {
      icon: string | JSX.Element;
      iconShadow: string;
      text: string | JSX.Element;
   };
   cta: React.MouseEventHandler<HTMLDivElement>;
};

export const MenuPrimaryOption = ({
   iconType,
   textType,
   optionProperties
}: TMenuPrimaryOptionProps) => {
   // determine the color of the shadow
   let shadowClr: string = "";

   switch (optionProperties.iconShadow) {
      case "light":
         shadowClr = "2px 2px 6px #F1EAFF";
         break;

      case "dark":
         shadowClr = "4px 4px 6px #1a1723";
         break;

      default:
         shadowClr = `2px 2px 6px ${optionProperties.iconShadow}`;
         break;
   }

   return (
      <div className={`${styles.mainWrapper}`}>
         {/*  if the left side button is an icon retrun this */}
         {iconType === "icon" && (
            <div className={`${styles.icon}`} style={{ boxShadow: shadowClr }}>
               <div className={styles.iconWrapper}>{optionProperties.icon}</div>
            </div>
         )}

         {/* eles if it is a text string return this  */}
         {iconType === "text" && (
            <div className={`${styles.icon}`} style={{ boxShadow: shadowClr }}>
               <Parragraph
                  align='center'
                  size='large'
                  text={optionProperties.icon}
                  lineHieght='.9em'
                  bold={true}
               />
            </div>
         )}

         {/* lastly if it is a plain color filled square return this */}
         {iconType === "filled" && (
            <div
               className={`${styles.icon}`}
               style={{ boxShadow: shadowClr, backgroundColor: optionProperties.iconShadow }}></div>
         )}

         {textType === "text" && (
            <div className={styles.text}>
               <Parragraph size='main' text={optionProperties.text} />
            </div>
         )}

         {textType === "jsx" && (
            <div className={styles.text}>
               <div className={styles.textJsx}>{optionProperties.text}</div>
            </div>
         )}
      </div>
   );
};
