// core
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
   currentRanking: number;
   totalReviews: number;
   thumbnail: string;
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
   totalReviews,
   description,
   thumbnail,
   bookUrl,
   newClass
}: bookProps) => {
   // set the images not directly from props but by state to set img fallback if it does not exist
   const [imageThumbnailState, setImageThumbnailState] = useState<string>(thumbnail);
   return (
      <div
         className={`${bookStyles.mainWrapper} ${newClass}`}
         key={id}
         style={{ backgroundColor: tagColors[0] }}>
         <a href={bookUrl} target='_blank' rel='noopener noreferrer'>
            <div className={bookStyles.bookInfoWrapper}>
               <h1 className={`${bookStyles.title}`}>{title}</h1>
               <h3 className={`${bookStyles.author}`}>{author}</h3>
               <p className={`${bookStyles.category}`}>Category: {categoryTags[0]}</p>
            </div>
         </a>

         {thumbnail ? (
            <a
               href={bookUrl}
               target='_blank'
               rel='noopener noreferrer'
               className={bookStyles.bookImg}
               style={{ backgroundImage: `url(${thumbnail})` }}></a>
         ) : (
            <a
               href={bookUrl}
               target='_blank'
               rel='noopener noreferrer'
               className={bookStyles.bookImg}
               onError={() => setImageThumbnailState("/images/Page-library/book.png")}>
               <Image src={imageThumbnailState} alt='book thumbnail' layout='fill' />
            </a>
         )}
         <StarReviews
            contentType='BOOK'
            totalReviews={totalReviews}
            contentId={id}
            currentRanking={currentRanking}
         />
      </div>
   );
};

export default Book;
