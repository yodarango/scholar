/**************************************************************************************** 
removed '[]' from next's router for the specified key 
****************************************************************************************/
export const parseRouter = (pathname: string, router: any, keyToParse: string) => {
   let path: string = "";
   if (
      pathname.includes(`[${keyToParse}]`) &&
      router?.query[keyToParse] &&
      typeof router?.query[keyToParse] === "string"
   ) {
      path = router.pathname.replace(`[${keyToParse}]`, router.query[keyToParse]);

      delete router.query[keyToParse];
      router.pathname = path;

      return router;
   }
};
