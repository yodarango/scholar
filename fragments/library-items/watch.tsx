// core
import React from "react";
import Image from "next/image";

// components
import StarReviews from "../star-reviews";

// styles
import watchStyles from "../../styles/fragments/library-items/Watch.module.css";

export type watchProps = {
   id: string;
   thumbnail: string;
   title: string;
   by: string;
   userId: string;
   currentRanking: Number;
   description?: string;
   sermonUrl: string;
   user?: any;
   newClass?: string;
};

const Watch = ({ thumbnail, title, by, currentRanking, sermonUrl, id, newClass }: watchProps) => {
   return (
      <div className={`${watchStyles.mainWrapper} ${newClass}`}>
         <a
            href={`${sermonUrl}`}
            target='_blank'
            rel='noopener noreferrer'
            className={watchStyles.thumbnailWrapper}>
            <Image
               src={thumbnail}
               alt='podcast thumbnail'
               layout='fill'
               className={watchStyles.thumbnail}
            />
         </a>
         <StarReviews contentId={id} currentRanking={currentRanking} />
         <h2 className={watchStyles.name}>{title}</h2>
         <h3 className={watchStyles.author}>{by}</h3>
      </div>
   );
};

export default Watch;
