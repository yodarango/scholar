// core
import React, { useState } from "react";

// components
import StarReviews from "../star-reviews";

// styles
import blogStyles from "../../styles/fragments/library-items/Blog.module.css";

export type blogProps = {
   id: string;
   thumbnail: string;
   blogName: string;
   author: string;
   currentRanking: Number;
   description: string;
   blogUrl: string;
   user?: any;
   newClass?: string;
};

const Blog = ({
   thumbnail,
   blogName,
   author,
   currentRanking,
   blogUrl,
   description,
   id,
   user,
   newClass
}: blogProps) => {
   // ===============   FUNCTIOn: 1 Open the podcast review   =============//
   const [openBlogDescState, setOpenBlogDescState] = useState<JSX.Element | boolean>(false);

   const handleOpenDescription = () => {
      setOpenBlogDescState(
         <div className={`${blogStyles.descPopup}`} key={id}>
            <div
               className={`${blogStyles.descPopupCloseModal} closeModal`}
               onClick={() => setOpenBlogDescState(false)}>
               X
            </div>
            <h1 className={`${blogStyles.descPopupTitle}`}>{blogName}</h1>
            {author && <h3 className={blogStyles.popUpHost}>Blog authored By: {author}</h3>}
            <img src={thumbnail} alt='podcast thumbnail' className={`${blogStyles.descPopupImg}`} />
            <div className={`${blogStyles.starReviewWrapper}`}>
               <StarReviews contentId={id} currentRanking={currentRanking} />
            </div>
            <section className={blogStyles.popupDescription}>{description}</section>
            {blogUrl && (
               <a
                  href={blogUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${blogStyles.descPopUpFooter} ${blogStyles.blogUrl}`}>
                  Visit {blogName} Now!
               </a>
            )}
         </div>
      );
   };
   return (
      <>
         {openBlogDescState}
         <div className={`${blogStyles.mainWrapper} ${newClass}`}>
            <div className={blogStyles.thumbnailWrapper} onClick={handleOpenDescription}>
               <img src={thumbnail} alt='podcast thumbnail' className={blogStyles.thumbnail} />
            </div>
            <StarReviews contentId={id} currentRanking={currentRanking} />
            <h2 className={blogStyles.name}>{blogName}</h2>
            {author && <h3 className={blogStyles.author}>{author}</h3>}
            {blogUrl && (
               <a
                  href={blogUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={blogStyles.blogUrl}>
                  Visit Blog
               </a>
            )}
         </div>
      </>
   );
};

export default Blog;
