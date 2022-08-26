// this component return a list option for the primary menu, It is composed of a left side icon and a right side description
// There are three kinds of left button types: icon, text and filled color.
// there are two types of right hand description; plain text or jsx

// components
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./menu_primary_option.module.css";

type TMenuPrimaryOptionProps = {
   iconType: string;
   textType: string;
   optionProperties: {
      icon: string | JSX.Element;
      text: string | JSX.Element;
      iconShadow?: string;
      descColor?: string;
   };
   cta: React.MouseEventHandler<HTMLDivElement>;
};

export const MenuPrimaryOption = ({
   iconType,
   textType,
   optionProperties,
   cta
}: TMenuPrimaryOptionProps) => {
   // determine the color of the shadow
   let shadowClr: string = "";

   switch (optionProperties.iconShadow) {
      case "1":
         shadowClr = "2px 2px 6px #F1EAFF";
         break;

      case "2":
         shadowClr = "4px 4px 6px #1a1723";
         break;

      default:
         shadowClr = `2px 2px 6px ${optionProperties.iconShadow}`;
         break;
   }

   return (
      <div className={`${styles.mainWrapper}`} onClick={cta}>
         {/* --------------------------------------- Left side icon ---------------- */}
         {/*  if the left side button is an icon retrun this */}
         {iconType === "icon" && (
            <div className={`${styles.icon}`} style={{ boxShadow: shadowClr }}>
               <div className={styles.iconWrapper}>{optionProperties.icon}</div>
            </div>
         )}

         {/* else if it is a text string return this  */}
         {iconType === "text" && (
            <div className={`${styles.icon}`} style={{ boxShadow: shadowClr }}>
               <Parragraph
                  align='center'
                  size='large'
                  text={optionProperties.icon}
                  lineHieght='.9em'
                  bold={true}
                  color={optionProperties.iconShadow}
               />
            </div>
         )}

         {/* lastly if it is a plain color filled square return this */}
         {iconType === "filled" && (
            <div
               className={`${styles.icon}`}
               style={{ boxShadow: shadowClr, backgroundColor: optionProperties.iconShadow }}></div>
         )}

         {/* --------------------------------------- right side text ---------------- */}
         {textType === "text" && (
            <div className={styles.text}>
               <div className={styles.textText}>
                  {optionProperties.descColor && (
                     <Parragraph
                        size='main'
                        text={optionProperties.text}
                        color={optionProperties.descColor}
                     />
                  )}
                  {!optionProperties.descColor && (
                     <Parragraph size='main' text={optionProperties.text} />
                  )}
               </div>
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
