// core
import React from "react";

// styles
import articleStyles from "../../styles/fragments/library-items/Article.module.css";
import StarReviews from "../star-reviews";

export type articleProps = {
   id: string;
   userId: string;
   userSignature: string;
   tags: string[];
   colors: string;
   title: string;
   author: string;
   reviews: string[];
   stars: number[];
   description: string;
   file: string;
};

const Article = ({
   id,
   userId,
   userSignature,
   tags,
   colors,
   title,
   author,
   reviews,
   stars,
   description,
   file
}: articleProps) => {
   return (
      <div className={articleStyles.mainWrapper}>
         <div className={articleStyles.paperSheet}>
            <div className={articleStyles.paperLines}>
               <span></span>
               <span></span>
               <span></span>
               <span></span>
               <span></span>
               <div className={articleStyles.textWrapper}>
                  <h1 className={articleStyles.title}>{title}</h1>
                  <h3 className={articleStyles.author}>by: {author}</h3>
                  <span className={articleStyles.Category}>Category: {tags[0]}</span>
               </div>
            </div>
            <span className={articleStyles.paperBent}></span>
         </div>
         <StarReviews reviews={reviews} stars={stars} />
      </div>
   );
};

export default Article;
