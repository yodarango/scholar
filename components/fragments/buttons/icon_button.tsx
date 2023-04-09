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
   custombuttonSize?: boolean;
   link?: string;
   isDownload?: boolean;
   type?: any;
   shadowColor?: string;
   cta?: {
      handleClick: () => void;
   };
};

export const IconButton = ({
   iconSize = "2rem",
   icon,
   iconColor = "#F1EAFF",
   custombuttonSize,
   backgroundColor,
   link,
   isDownload = false,
   type = "button",
   cta,
   shadowColor = "1"
}: TIconButtonProps) => {
   return (
      <>
         {backgroundColor === "1" &&
            (!link ? (
               <button
                  type={type}
                  className={`${styles.mainWrapper} ${
                     custombuttonSize && styles.mainWrapperCustomSize
                  } ${styles.primary} ${
                     shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                  }`}
                  onClick={cta?.handleClick}>
                  <Icon name={icon} color={iconColor} size={iconSize} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        custombuttonSize && styles.mainWrapperCustomSize
                     } ${styles.primary} ${
                        shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                     }`}>
                     <Icon name={icon} color={iconColor} size={iconSize} />
                  </a>
               </Link>
            ))}

         {backgroundColor === "2" &&
            (!link ? (
               <button
                  type={type}
                  className={`${styles.mainWrapper} ${
                     custombuttonSize && styles.mainWrapperCustomSize
                  } ${styles.secondary} ${
                     shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                  }`}
                  onClick={cta?.handleClick}>
                  <Icon name={icon} color={iconColor} size={iconSize} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        custombuttonSize && styles.mainWrapperCustomSize
                     } ${styles.secondary} ${
                        shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                     }`}>
                     <Icon name={icon} color={iconColor} size={iconSize} />
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
                  style={{ backgroundColor }}
                  onClick={cta?.handleClick}>
                  <Icon name={icon} color={iconColor} size={iconSize} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        custombuttonSize && styles.mainWrapperCustomSize
                     } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                     style={{ backgroundColor }}>
                     <Icon name={icon} color={iconColor} size={iconSize} />
                  </a>
               </Link>
            ))}
      </>
   );
};
