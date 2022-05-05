// core
import React, { useState } from "react";
import Image from "next/image";

// components
import StarReviews from "../star-reviews";

// styles
import blogStyles from "../../styles/fragments/library-items/Blog.module.css";

export type blogProps = {
   id: string;
   thumbnail: string;
   blogName: string;
   author: string;
   currentRanking: number;
   totalReviews: number;
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
   totalReviews,
   newClass
}: blogProps) => {
   // set the images not directly from props but by state to set img fallback if it does not exist
   const [imageThumbnailState, setImageThumbnailState] = useState<string>(thumbnail);

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
            <div className={`${blogStyles.descPopupImg}`}>
               <Image src={imageThumbnailState} alt='podcast thumbnail' layout='fill' />
            </div>
            <div className={`${blogStyles.starReviewWrapper}`}>
               <StarReviews
                  totalReviews={totalReviews}
                  contentType='BLOG'
                  contentId={id}
                  currentRanking={currentRanking}
               />
            </div>
            {description && (
               <section className={blogStyles.popupDescription}>{description}</section>
            )}
            {!description && (
               <section className={blogStyles.popupDescription}>
                  There is no description available for this content currently. If you own this blog
                  contact us and help us stay up to date by providing it.
               </section>
            )}
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
            {thumbnail && (
               <div className={blogStyles.thumbnailWrapper} onClick={handleOpenDescription}>
                  <Image
                     src={`${imageThumbnailState}`}
                     alt='podcast thumbnail'
                     layout='fill'
                     onError={() => setImageThumbnailState("/Parks10.png")}
                  />
               </div>
            )}
            <StarReviews
               contentId={id}
               currentRanking={currentRanking}
               totalReviews={totalReviews}
               contentType='BLOG'
            />
            <h2 className={blogStyles.name}>{blogName}</h2>
            {author && <h3 className={blogStyles.author}>{author}</h3>}
            {blogUrl && (
               <a
                  href={blogUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={blogStyles.blogUrl}
                  id={blogStyles.blogUrl}>
                  Visit Blog
               </a>
            )}
         </div>
      </>
   );
};

export default Blog;
