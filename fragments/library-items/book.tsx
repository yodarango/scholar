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
         <Link href={url}>
            <a>
               <h1 className={`${bookStyles.title}`}>{title}</h1>
               <h3 className={`${bookStyles.author}`}>{author}</h3>
               <p className={`${bookStyles.category}`}>Category: {tags[0]}</p>
               <StarReviews reviews={reviews} stars={stars} />
            </a>
         </Link>
      </div>
   );
};

export default Book;
