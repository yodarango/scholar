// renders a button or a <a></a> based on the "link" prop which represents the link to be redirected to and at the same time
// acts as the determining property that decides whether to render the button or th eanchor tag

import Link from "next/link";

// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./icon_button.module.css";

export type TIconButtonProps = {
   iconSize?: string;
   iconColor?: string;
   icon: string;
   backgroundColor?: string;
   background?: string;
   custombuttonSize?: any;
   strokeWidth?: string;
   link?: string;
   isDownload?: boolean;
   type?: any;
   style?: any;
   shadowColor?: string;
   cta?: {
      handleClick: () => void;
   };
};

export const IconButton = ({
   iconSize = "3rem",
   icon,
   iconColor = "#F1EAFF",
   custombuttonSize,
   backgroundColor,
   background,
   link,
   style,
   strokeWidth = "32",
   isDownload = false,
   type = "button",
   cta,
   shadowColor = "1"
}: TIconButtonProps) => {
   const addStyles: any = {};

   if (shadowColor && shadowColor !== "1" && shadowColor !== "2")
      addStyles.boxShadow = `.2rem .2rem .2rem ${shadowColor}`;
   if (shadowColor === "none") addStyles.boxShadow = "none";

   return (
      <>
         {backgroundColor === "1" &&
            (!link ? (
               <button
                  type={type}
                  style={{
                     ...custombuttonSize,
                     ...style,
                     width: `${parseInt(iconSize.split("rem")[0]) + 1}rem`,
                     height: `${parseInt(iconSize.split("rem")[0]) + 1}rem`
                  }}
                  className={`${styles.mainWrapper} ${
                     custombuttonSize && styles.mainWrapperCustomSize
                  } ${styles.primary} ${
                     shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                  }`}
                  onClick={cta?.handleClick}>
                  <Icon name={icon} color={iconColor} size={iconSize} strokeWidth={strokeWidth} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     style={{
                        width: `${parseInt(iconSize.split("rem")[0]) + 1}rem`,
                        height: `${parseInt(iconSize.split("rem")[0]) + 1}rem`
                     }}
                     className={`${styles.mainWrapper} ${
                        custombuttonSize && styles.mainWrapperCustomSize
                     } ${styles.primary} ${
                        shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                     }`}>
                     <Icon
                        name={icon}
                        color={iconColor}
                        size={iconSize}
                        strokeWidth={strokeWidth}
                     />
                  </a>
               </Link>
            ))}

         {backgroundColor === "2" &&
            (!link ? (
               <button
                  style={{
                     ...custombuttonSize,
                     ...addStyles,
                     ...style,
                     width: `${parseInt(iconSize.split("rem")[0]) + 1}rem`,
                     height: `${parseInt(iconSize.split("rem")[0]) + 1}rem`
                  }}
                  type={type}
                  className={`${styles.mainWrapper} ${
                     custombuttonSize && styles.mainWrapperCustomSize
                  } ${styles.secondary} ${
                     shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                  }`}
                  onClick={cta?.handleClick}>
                  <Icon name={icon} color={iconColor} size={iconSize} strokeWidth={strokeWidth} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     style={{
                        ...custombuttonSize,
                        ...addStyles,
                        ...style,
                        width: `${parseInt(iconSize.split("rem")[0]) + 1}rem`,
                        height: `${parseInt(iconSize.split("rem")[0]) + 1}rem`
                     }}
                     className={`${styles.mainWrapper} ${
                        custombuttonSize && styles.mainWrapperCustomSize
                     } ${styles.secondary} ${
                        shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                     }`}>
                     <Icon
                        name={icon}
                        color={iconColor}
                        size={iconSize}
                        strokeWidth={strokeWidth}
                     />
                  </a>
               </Link>
            ))}

         {backgroundColor !== "1" &&
            backgroundColor !== "2" &&
            (!link ? (
               <button
                  type={type}
                  className={`${styles.mainWrapper} ${
                     custombuttonSize && styles.mainWrapperCustomSize
                  } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                  style={{
                     ...custombuttonSize,
                     background,
                     ...addStyles,
                     ...style,
                     width: `${parseInt(iconSize.split("rem")[0]) + 1}rem`,
                     height: `${parseInt(iconSize.split("rem")[0]) + 1}rem`
                  }}
                  onClick={cta?.handleClick}>
                  <Icon name={icon} color={iconColor} size={iconSize} strokeWidth={strokeWidth} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        custombuttonSize && styles.mainWrapperCustomSize
                     } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                     style={{
                        ...custombuttonSize,
                        background,
                        ...addStyles,
                        width: `${parseInt(iconSize.split("rem")[0]) + 1}rem`,
                        height: `${parseInt(iconSize.split("rem")[0]) + 1}rem`
                     }}>
                     <Icon
                        name={icon}
                        color={iconColor}
                        size={iconSize}
                        strokeWidth={strokeWidth}
                     />
                  </a>
               </Link>
            ))}
      </>
   );
};
