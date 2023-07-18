/**************************************************************************************** 
-  renders a list of commentary posts width a filter on the top that passes down the 
   filters to the post wrapper 🔥
**********************************
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { PrimaryStack } from "./templates/primary_stack";
import { CategoryTag } from "../../fragments/chunks/category_tag";

// styles
import styles from "./articles_w_filter.module.css";
import { ArticlesGrid } from "../scrollers/user_content/articles_grid";

type TCommentariesByBookProps = {
   cta: {
      handleClose: () => void;
   };
};
export const ArticlesWFilter = ({ cta }: TCommentariesByBookProps) => {
   // router
   const router = useRouter();

   // states
   const [currentView, setcurrentView] = useState<string>("1"); // all or book by book
   const [scrollYDis, setscrollYDis] = useState<number>(0); // header styles
   const [scrollingDir, setscrollingDir] = useState<string>("none"); //scrolling direction to know how to move header
   const [tagFilter, settagFilter] = useState<any>(null); // category

   // push new category tag to the router
   const handleCategorySelecion = (tag: string) => {
      router.push({
         pathname: router.pathname,
         query: { ...router.query, category: tag }
      });
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
         title='Articles'
         cta={{ handleClose: cta.handleClose, handleScroll: handleHeader }}>
         <div
            className={`${styles.filters} ${scrollingDir === "up" && styles.scrollingUp} ${
               scrollingDir === "down" && styles.scrollingDown
            }`}>
            <div className={styles.tag}>
               <CategoryTag
                  initiaValue={tagFilter}
                  cta={{ handleSelection: handleCategorySelecion }}
                  informativeOnly={false}
               />
            </div>
         </div>
         <section className={styles.posts}>
            <ArticlesGrid />
         </section>
      </PrimaryStack>
   );
};
