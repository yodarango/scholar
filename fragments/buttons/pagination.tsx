/**********************************************************************************
-  Paginates through any content by passsing the string to go to back or forth, the 
   strings passed can be handled as a helper to help parse the router string
 **********************************************************************************/
// core
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//styles
import styles from "./pagination.module.css";
import { Icon } from "../chunks/icons";

// helpers
import { handleBibleChapterPagination } from "../../helpers/router/paginate_bible_passage";

type TpaginationProps = {
   forContent: string;
   goBack: string | null | undefined;
   goForth: string | null | undefined;
   top?: string;
   left?: string;
   right?: string;
   type: string;
};

export const Pagination = ({
   forContent,
   goBack,
   goForth,
   type,
   top = "70vh",
   left = "1rem",
   right = "1rem"
}: TpaginationProps) => {
   const router = useRouter();

   // --------------------------------- initial pagination states ----------------------------
   const [showBackwarButton, setShowBackwarButton] = useState<string | null | undefined>(goBack);
   const [showForwardButton, setShowForwardButton] = useState<string | null | undefined>(goForth);

   useEffect(() => {
      if (router.isReady) {
         // --------- validate what content it will be rendered for to make the appropaite function -----------
         if (forContent === "read") {
            const linkData = handleBibleChapterPagination(goBack, goForth);
            setShowBackwarButton(linkData?.showBackbutton);
            setShowForwardButton(linkData?.showForthbutton);
         }
      }
   }, [router.isReady, router.query]);

   return (
      <>
         {showBackwarButton && (
            <Link href={showBackwarButton}>
               <a
                  className={`${styles.left} ${
                     type === "1" ? styles.primary : type === "3" ? styles.secondary : styles.third
                  }`}
                  style={{ top: top, left: left }}>
                  <Icon name='arrowBack' color='#F1EAFF' size='2rem' strokeWidth='64' />
               </a>
            </Link>
         )}

         {showForwardButton && (
            <Link href={showForwardButton}>
               <a
                  className={`${styles.right} ${
                     type === "1" ? styles.primary : type === "3" ? styles.secondary : styles.third
                  }`}
                  style={{ top: top, right: right }}>
                  <Icon name='arrowForth' color='#F1EAFF' size='2rem' strokeWidth='64' />
               </a>
            </Link>
         )}
      </>
   );
};
