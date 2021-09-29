// core
import React from "react";
import Link from "next/link";

// components
import StarReviews from "../star-reviews";

//styles
import bookStyles from "../../styles/fragments/library-items/Book.module.css";

// other
//import { unsplashAccess, unsplashSecret } from "../../env";
export type bookProps = {
   id: string;
   title: string;
   author: string;
   categoryTags: string[];
   tagColors: string[];
   currentRanking: Number;
   description: string;
   bookUrl: string;
   user?: any;
   newClass?: string;
};
const Book = ({
   id,
   title,
   author,
   categoryTags,
   tagColors,
   currentRanking,
   description,
   bookUrl,
   newClass
}: bookProps) => {
   // calling unsplash api will be great in the future, i have the dev keys.
   return (
      <div
         className={`${bookStyles.mainWrapper} ${newClass}`}
         key={id}
         style={{ backgroundColor: tagColors[0] }}>
         <a>
            <div className={bookStyles.bookImgInfoWrapper}>
               <Link href={bookUrl}>
                  <div className={bookStyles.bookInfoWrapper}>
                     <h1 className={`${bookStyles.title}`}>{title}</h1>
                     <h3 className={`${bookStyles.author}`}>{author}</h3>
                     <p className={`${bookStyles.category}`}>Category: {categoryTags[0]}</p>
                  </div>
               </Link>
               <div className={bookStyles.bookImg}></div>
            </div>
            <StarReviews contentId={id} currentRanking={currentRanking} />
         </a>
      </div>
   );
};

export default Book;
