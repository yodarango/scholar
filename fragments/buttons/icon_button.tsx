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
   backgroundColor: string;
   buttonSize?: string;
   link?: string;
   shadowColor?: string;
   cta?: React.MouseEventHandler<HTMLButtonElement>;
};

export const IconButton = ({
   iconSize = "2rem",
   icon,
   iconColor = "#F1EAFF",
   buttonSize,
   backgroundColor,
   link,
   cta,
   shadowColor = "1"
}: TIconButtonProps) => {
   return (
      <>
         {backgroundColor === "1" &&
            (!link ? (
               <button
                  className={`${styles.mainWrapper} ${buttonSize && styles.mainWrapperCustomSize} ${
                     styles.primary
                  } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                  onClick={cta}>
                  <Icon name={icon} color={iconColor} size={iconSize} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        buttonSize && styles.mainWrapperCustomSize
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
                  className={`${styles.mainWrapper} ${buttonSize && styles.mainWrapperCustomSize} ${
                     styles.secondary
                  } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                  onClick={cta}>
                  <Icon name={icon} color={iconColor} size={iconSize} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        buttonSize && styles.mainWrapperCustomSize
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
                  className={`${styles.mainWrapper} ${buttonSize && styles.mainWrapperCustomSize} ${
                     shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                  }`}
                  style={{ backgroundColor }}
                  onClick={cta}>
                  <Icon name={icon} color={iconColor} size={iconSize} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        buttonSize && styles.mainWrapperCustomSize
                     } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                     style={{ backgroundColor }}>
                     <Icon name={icon} color={iconColor} size={iconSize} />
                  </a>
               </Link>
            ))}
      </>
   );
};
