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
   tags: string[];
   colors: string[];
   reviews: string[];
   stars: number[];
   description: string;
   url: string;
};
const Book = ({ id, title, author, tags, colors, reviews, stars, description, url }: bookProps) => {
   // calling unsplash api will be great in the future, i have the dev keys.
   return (
      <div className={`${bookStyles.mainWrapper}`} key={id} style={{ backgroundColor: colors[0] }}>
         <a>
            <div className={bookStyles.bookImgInfoWrapper}>
               <Link href={url}>
                  <div className={bookStyles.bookInfoWrapper}>
                     <h1 className={`${bookStyles.title}`}>{title}</h1>
                     <h3 className={`${bookStyles.author}`}>{author}</h3>
                     <p className={`${bookStyles.category}`}>Category: {tags[0]}</p>
                  </div>
               </Link>
               <div className={bookStyles.bookImg}></div>
            </div>
            <StarReviews contentId={id} reviews={reviews} stars={stars} />
         </a>
      </div>
   );
};

export default Book;
