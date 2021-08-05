// core
import React from "react";
import Link from "next/link";

// components
import StarReviews from "../star-reviews";

// styles
import sermonStyles from "../../styles/fragments/library-items/Sermon.module.css";

export type sermonProps = {
   id?: string;
   userId?: string;
   userSignature?: string;
   tags: string[];
   colors: string[];
   title: string;
   author: string;
   reviews: string[];
   stars: number[];
   description?: string;
   file: string;
};

const Sermon = ({ id, tags, colors, title, author, reviews, stars, file, userId }: sermonProps) => {
   return (
      <div className={`${sermonStyles.mainWrapper}`} key={id}>
         <div
            className={sermonStyles.innerpages}
            style={{
               borderTop: `5px solid ${colors[0]}`,
               borderRight: `5px solid ${colors[0]}`
            }}></div>
         <Link href={file}>
            <a>
               <div className={sermonStyles.outerCover} style={{ backgroundColor: colors[0] }}>
                  <div className={sermonStyles.textWrapper}>
                     <h1 className={sermonStyles.title}>{title}</h1>

                     <h3 className={sermonStyles.author}>by: {author}</h3>

                     <span className={sermonStyles.Category}>Category: {tags[0]}</span>
                  </div>
               </div>
            </a>
         </Link>
         <StarReviews stars={stars} reviews={reviews} />
      </div>
   );
};

export default Sermon;
