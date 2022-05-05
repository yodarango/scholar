// core
import React from "react";
import Image from "next/image";

// compnents
import Blog from "../../fragments/library-items/blog";
import CardsLazyLoading from "../cards-lazy-loading";

// styles
import LibraryBlogsCarrouselStyles from "../../styles/layouts/library-home-page/LibraryBlogsCarrousel.module.css";
import cardsLazyLoadingStyle from "../../styles/layouts/CardsLazyLoading.module.css";

//types
import { blogProps } from "../../fragments/library-items/blog";

type LibraryBlogsCarrouselProps = {
   blogs: blogProps[] | undefined;
   err: boolean;
};
const LibraryBlogsCarrousel = ({ blogs, err }: LibraryBlogsCarrouselProps) => {
   // ===============   FUNCTION 1: fetch the podcast =====================//
   return (
      <div className={`${LibraryBlogsCarrouselStyles.mainWrapper}`}>
         <h1 className={LibraryBlogsCarrouselStyles.title}>BLOGS</h1>
         <div className={LibraryBlogsCarrouselStyles.scrollSection}>
            {blogs &&
               blogs.map((blog: blogProps) => {
                  return (
                     <Blog
                        id={blog.id}
                        key={blog.id}
                        thumbnail={blog.thumbnail}
                        author={blog.user === null ? "" : blog.user.fullName}
                        description={blog.description}
                        blogUrl={blog.blogUrl}
                        currentRanking={blog.currentRanking}
                        blogName={blog.blogName}
                        totalReviews={blog.totalReviews}
                     />
                  );
               })}
            {!blogs && !err && (
               <CardsLazyLoading
                  amount={10}
                  compClass={cardsLazyLoadingStyle.libraryHomePageSquare}
               />
            )}

            {err && (
               <div className={cardsLazyLoadingStyle.errorImage}>
                  <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
               </div>
            )}
         </div>
      </div>
   );
};

export default LibraryBlogsCarrousel;
