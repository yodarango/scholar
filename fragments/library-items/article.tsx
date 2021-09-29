// core
import React from "react";
import Link from "next/link";

// styles
import articleStyles from "../../styles/fragments/library-items/Article.module.css";
import StarReviews from "../star-reviews";

export type articleProps = {
   id: string;
   userId: string;
   categoryTags: string[];
   tagColors: string[];
   title: string;
   author: string;
   currentRanking: Number;
   description?: string;
   fileUrl: string;
   user?: any;
   newClass?: string;
};

const Article = ({
   id,
   userId,
   categoryTags,
   tagColors,
   title,
   author,
   currentRanking,
   description,
   fileUrl,
   user,
   newClass
}: articleProps) => {
   return (
      <div className={`${articleStyles.mainWrapper} ${newClass}`}>
         <Link href={fileUrl}>
            <a>
               <div className={articleStyles.paperSheet}>
                  <div className={articleStyles.paperLines}>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <div className={articleStyles.textWrapper}>
                        <h1
                           className={articleStyles.title}
                           style={{ backgroundColor: tagColors[0] }}>
                           {title}
                        </h1>
                        <h3 className={articleStyles.author}>by: {author}</h3>
                        <p className={articleStyles.category}>Category: {categoryTags[0]}</p>
                     </div>
                  </div>
                  <span className={articleStyles.paperBent}></span>
               </div>
            </a>
         </Link>
         <StarReviews contentId={id} currentRanking={currentRanking} />
      </div>
   );
};

export default Article;
