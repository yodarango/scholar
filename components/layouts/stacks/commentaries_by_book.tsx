import { useState } from "react";
import { useRouter } from "next/router";
// comps
import { Third } from "../../fragments/buttons/third";
import { PrimaryStack } from "./templates/primary_stack";

// styles
import styles from "./commentaries_by_book.module.css";
import { CategoryTag } from "../../fragments/chunks/category_tag";
import { CommentariesGrid } from "../scrollers/user_content/commentaries_grid";
import { Secondary } from "../../fragments/buttons/secondary";

type TCommentariesByBookProps = {
   cta: {
      handleClose: () => void;
   };
};
export const CommentariesByBook = ({ cta }: TCommentariesByBookProps) => {
   const [currentView, setcurrentView] = useState<string>("1");
   const [scrollYDis, setscrollYDis] = useState<number>(0);
   const [scrollingDir, setscrollingDir] = useState<string>("none");

   // router
   const router = useRouter();

   // push new category tag to the router
   const handleCategorySelecion = (tag: string) => {
      router.query["category"]
         ? (router.query.category = `?category=${tag}`)
         : router.push(`${router.asPath}?category=${tag}`);
   };

   // handle show header
   const handleHeader = (e: any) => {
      console.log(e);
      const distance = e.target.scrollTop;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;
      setscrollYDis(distance);
      setscrollingDir(isScrollingDown ? "down" : "up");
   };

   return (
      <PrimaryStack title='Commentaries' cta={{ handleClose: cta.handleClose }}>
         <div
            className={`${styles.filters} ${scrollingDir === "up" && styles.scrollingUp} ${
               scrollingDir === "down" && styles.scrollingDown
            }`}>
            <div className={styles.button}>
               <Secondary
                  fullWidth
                  icon='📚'
                  type={currentView}
                  title='All'
                  cta={{ handleClick: () => {} }}
               />
            </div>
            <div className={styles.button}>
               <Secondary
                  fullWidth
                  icon='📖'
                  type={currentView}
                  title='By book'
                  cta={{ handleClick: () => {} }}
               />
            </div>
            <div className={styles.tag}>
               <CategoryTag
                  cta={{ handleSelection: handleCategorySelecion }}
                  informativeOnly={false}
               />
            </div>
         </div>
         <section className={styles.posts}>
            <CommentariesGrid verseId='' />
         </section>
      </PrimaryStack>
   );
};
