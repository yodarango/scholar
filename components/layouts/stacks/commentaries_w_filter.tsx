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
import { Secondary } from "../../fragments/buttons/secondary";

// styles
import styles from "./commentaries_w_filter.module.css";

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
   const [currentView, setcurrentView] = useState<string>("1"); // all or book by book. Eventually folder id
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
         title='Commentaries'
         cta={{ handleClose: cta.handleClose, handleScroll: handleHeader }}>
         <div
            className={`${styles.filters} ${scrollingDir === "up" && styles.scrollingUp} ${
               scrollingDir === "down" && styles.scrollingDown
            }`}>
            <div className={styles.button}>
               <Secondary
                  fullWidth
                  icon='📚'
                  type={currentView === "1" ? "2" : "1"}
                  title='All'
                  cta={{ handleClick: () => setcurrentView("1") }}
               />
            </div>
            <div className={styles.button}>
               <Secondary
                  fullWidth
                  icon='📖'
                  type={currentView === "2" ? "2" : "1"}
                  title='By book'
                  cta={{ handleClick: () => setcurrentView("2") }}
               />
            </div>
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
