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
   currentRanking: number;
   totalReviews: number;
   description?: string;
   sermonUrl: string;
   user?: any;
   newClass?: string;
};

const Watch = ({
   thumbnail,
   title,
   by,
   currentRanking,
   sermonUrl,
   id,
   newClass,
   totalReviews
}: watchProps) => {
   return (
      <div className={`${watchStyles.mainWrapper} ${newClass}`}>
         {/* moving away from next Img too: slow
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
         </a> */}

         <a
            href={`${sermonUrl}`}
            target='_blank'
            rel='noopener noreferrer'
            className={watchStyles.thumbnailWrapper}>
            <img src={thumbnail} alt='podcast thumbnail' className={watchStyles.thumbnail} />
         </a>

         <StarReviews
            totalReviews={totalReviews}
            contentType='SERMON'
            contentId={id}
            currentRanking={currentRanking}
         />
         <h2 className={watchStyles.name}>{title}</h2>
         <h3 className={watchStyles.author}>{by}</h3>
      </div>
   );
};

export default Watch;
