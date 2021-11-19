// core
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//styles
import skipContentStyles from "../../styles/buttons/skipContent.module.css";
import { watch } from "fs";

type skipContProps = {
   wrapperMaxWidth: string;
   content: any;
};

const SkipContent = ({ wrapperMaxWidth, content }: skipContProps) => {
   const router = useRouter();

   // ==================== FUNCTION: skip Content =================== //
   const [showForwardButton, setShowForwardButton] = useState<boolean>(
      content.length < 20 ? false : true
   );
   const [showBackwarButton, setShowBackwarButton] = useState<boolean>(true);

   useEffect(() => {
      router.query.skip === "0"
         ? setShowBackwarButton(false)
         : !router.query.skip
         ? setShowBackwarButton(false)
         : content.length < 20
         ? setShowBackwarButton(false)
         : setShowBackwarButton(true);
   }, []);
   // ==========  skip to the previous 20 items
   const handleSkipBackwards = () => {
      setShowForwardButton(true);
      if (router.query.skip) {
         console.log(router.query.skip);
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
      } else if (router.query.skip && content.length === 20) {
         const currPath = router.asPath.replace(`&skip=${router.query.skip}`, "");
         router.replace(`${currPath}&skip=${parseInt(`${router.query.skip}`) + 20}`);
      } else {
         setShowForwardButton(false);
      }
   };

   return (
      <div className={`${skipContentStyles.mainWrapper}`} style={{ maxWidth: wrapperMaxWidth }}>
         {showBackwarButton && (
            <div className={`${skipContentStyles.leftTrigger}`} onClick={handleSkipBackwards}></div>
         )}
         {!showBackwarButton && <div></div>}
         {showForwardButton && (
            <div className={`${skipContentStyles.rightTrigger}`} onClick={handleSkipForward}></div>
         )}
         {!showForwardButton && <div></div>}
      </div>
   );
};

export default SkipContent;
