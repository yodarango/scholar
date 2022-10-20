/**************************************************************************************** 
-  renders a list of quote posts width a filter on the top that passes down the 
   filters to the post wrapper
****************************************************************************************/

import { useState } from "react";
import { useRouter } from "next/router";

// comps
import { PrimaryStack } from "./templates/primary_stack";
import { CategoryTag } from "../../fragments/chunks/category_tag";
import { QuotesGrid } from "../scrollers/user_content/quotes_grid";

// styles
import styles from "./quotes_w_filter.module.css";

type TCommentariesByBookProps = {
   cta: {
      handleClose: () => void;
   };
};
export const QuotesWFilter = ({ cta }: TCommentariesByBookProps) => {
   // router
   const router = useRouter();

   // states
   const [currentView, setcurrentView] = useState<string>("1");
   const [scrollYDis, setscrollYDis] = useState<number>(0);
   const [scrollingDir, setscrollingDir] = useState<string>("none");
   const [tagFilter, settagFilter] = useState<any>(router.query.category);

   // push new category tag to the router
   const handleCategorySelecion = (tag: string) => {
      delete router.query.category;

      router.push("");
      router.push(`${router.pathname}?category=${tag}`);
      settagFilter(tag);
   };

   // handle show header
   const handleHeader = (e: any) => {
      const distance = e.target.scrollTop;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;
      setscrollYDis(distance);
      setscrollingDir(isScrollingDown ? "down" : "up");
   };

   return (
      <PrimaryStack
         title='Commentaries'
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
            {/* <CommentariesGrid filters={{ tag: commentaryTagFilter }} /> */}
            <QuotesGrid filters={{}} />
         </section>
      </PrimaryStack>
   );
};
