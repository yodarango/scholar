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

type TpaginationProps = {
   goBack: string;
   goForth: string;
   top?: string;
   left?: string;
   right?: string;
   type: string;
};

export const Pagination = ({
   goBack,
   goForth,
   type,
   top = "70vh",
   left = "1rem",
   right = "1rem"
}: TpaginationProps) => {
   const router = useRouter();

   // --------------------------------- initial pagination states ----------------------------
   const [showBackwarButton, setShowBackwarButton] = useState<string | null>(goBack);
   const [showForwardButton, setShowForwardButton] = useState<string | null>(goForth);

   /*  useEffect(() => {
      if (router.isReady) {
         console.log(content);
         if (router.query.skip === "0" || !router.query.skip) {
            setShowBackwarButton(false);
         } else {
            setShowBackwarButton(true);
         }
         content < 20 ? setShowForwardButton(false) : null;
      }
   }, [router.isReady, router.query]);
   // ==========  skip to the previous 20 items
   const handleSkipBackwards = () => {
      setShowForwardButton(true);
      if (router.query.skip) {
         if (parseInt(`${router.query.skip}`) - 20 === 0) {
            setShowBackwarButton(false);
         }
         if (Object.keys(router.query).length === 1 && Object.keys(router.query).includes("skip")) {
            const currPath = router.asPath.replace(`?skip=${router.query.skip}`, "");
            router.replace(`${currPath}?skip=${parseInt(`${router.query.skip}`) - 20}`);
         } else if (parseInt(`${router.query.skip}`) >= 20) {
            const currPath = router.asPath.replace(`&skip=${router.query.skip}`, "");
            router.replace(`${currPath}&skip=${parseInt(`${router.query.skip}`) - 20}`);
         } else {
            setShowBackwarButton(false);
         }
      }
   };

   // ============ FUNCTION: skip to the next 20 items
   const handleSkipForward = () => {
      setShowBackwarButton(true);
      if (Object.keys(router.query).length === 0) {
         router.replace(`${router.asPath}?skip=20`);
      } else if (Object.keys(router.query).length !== 0 && !router.query.skip) {
         router.replace(`${router.asPath}&skip=20`);
      } else if (
         Object.keys(router.query).length === 1 &&
         Object.keys(router.query).includes("skip")
      ) {
         const currPath = router.asPath.replace(`?skip=${router.query.skip}`, "");
         router.replace(`${currPath}?skip=${parseInt(`${router.query.skip}`) + 20}`);
      } else if (router.query.skip && content === 20) {
         const currPath = router.asPath.replace(`&skip=${router.query.skip}`, "");
         router.replace(`${currPath}&skip=${parseInt(`${router.query.skip}`) + 20}`);
      } else {
         setShowForwardButton(false);
      }
   };
   */

   return (
      <>
         {showBackwarButton && (
            <Link href={goBack}>
               <a
                  className={`${styles.left} ${type === "1" ? styles.primary : styles.secondary}`}
                  style={{ top: top, left: left }}>
                  <Icon name='arrowBack' color='#F1EAFF' size='2rem' />
               </a>
            </Link>
         )}
         {showForwardButton && (
            <Link href={goForth}>
               <a
                  className={`${styles.right} ${type === "1" ? styles.primary : styles.secondary}`}
                  style={{ top: top, right: right }}>
                  <Icon name='arrowForth' color='#F1EAFF' size='2rem' />
               </a>
            </Link>
         )}
      </>
   );
};
