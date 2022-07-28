//--------------- NOT USED MIGHT DELETE -----------
export const paginatelibraryContent = () => {
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
};
