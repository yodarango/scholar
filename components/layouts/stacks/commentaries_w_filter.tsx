/**************************************************************************************** 
-  renders a list of commentary posts width a filter on the top that passes down the 
   filters to the post wrapper
-  The filter is handled in the tagFilter prop which is manipulated through the useEffect
-  Allows users to filter what types of posts they want to see, by book or all. Eventually
   folders will be used which will be selected by Id through the currentView prop
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { PrimaryStack } from "./templates/primary_stack";
import { CategoryTag } from "../../fragments/chunks/category_tag";
import { CommentariesGrid } from "../scrollers/user_content/commentaries_grid";

// styles
import styles from "./commentaries_w_filter.module.css";
import { Dropdown } from "../../fragments/inputs/dropdown";
import { SelectCommentaryGroups } from "../menus/select_commentary_groups";

type TCommentariesByBookProps = {
   isSelf?: boolean;
   cta: {
      handleClose: () => void;
   };
};

export const CommentariesWFilter = ({ isSelf, cta }: TCommentariesByBookProps) => {
   // router
   const router = useRouter();

   // states
   const [scrollYDis, setscrollYDis] = useState<number>(0); // header styles
   const [scrollingDir, setscrollingDir] = useState<string>("none"); //scrolling direction to know how to move header

   // category filter
   const [tagFilter, settagFilter] = useState<any>(null); // category

   // folder filter
   const [currentFolderValue, setcurrentFolderValue] = useState<string>("Show Groups");
   const [showFolderOptions, setshowFolderOptions] = useState<boolean>(false);

   // push new category tag to the router
   const handleCategorySelecion = (tag: string) => {
      // parse the pathname
      const parsedRouter = parseRouter(router.pathname, router);

      delete router.query.signature;

      router.push({
         pathname: parsedRouter.pathname,
         query: { ...parsedRouter.query, category: tag }
      });
   };

   const handleFolderSelection = ({ value, label }: { label: string; value: string }) => {
      setcurrentFolderValue(label);
      setshowFolderOptions(!showFolderOptions);
   };

   // handle show header
   const handleHeader = (e: any) => {
      const distance = e.target.scrollTop;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;
      setscrollYDis(distance);
      setscrollingDir(isScrollingDown ? "down" : "up");
   };

   // check if there is a query on the initial load
   useEffect(() => {
      if (router.query.category) {
         settagFilter(router.query.category);
      }
   }, [router.isReady, router.query]);

   return (
      <PrimaryStack
         title='Commentaries'
         cta={{ handleClose: cta.handleClose, handleScroll: handleHeader }}>
         <div
            className={`${styles.filters} ${scrollingDir === "up" && styles.scrollingUp} ${
               scrollingDir === "down" && styles.scrollingDown
            }`}>
            {/* dropdown filter */}
            <div className={styles.dropdown}>
               <Dropdown
                  initialValue={currentFolderValue}
                  showOptions={showFolderOptions}
                  setshowOptions={setshowFolderOptions}>
                  <SelectCommentaryGroups
                     cta={{
                        handleSelection: ({ label, value }) =>
                           handleFolderSelection({ label, value }),
                        handleCloseModal: () => setshowFolderOptions(false)
                     }}
                  />
               </Dropdown>
            </div>

            {/* categories filter */}
            <div className={styles.tag}>
               <CategoryTag
                  initiaValue={tagFilter}
                  cta={{ handleSelection: handleCategorySelecion }}
                  informativeOnly={false}
               />
            </div>
         </div>
         <section className={styles.posts}>
            <CommentariesGrid isSelf={isSelf} />
         </section>
      </PrimaryStack>
   );
};

function parseRouter(pathname: string, router: any) {
   let path: string = "";
   if (
      pathname.includes("[signature") &&
      router?.query?.signature &&
      typeof router?.query?.signature === "string"
   )
      path = router.pathname.replace("[signature]", router.query.signature);

   delete router.query.signature;
   router.pathname = path;

   return router;
}
