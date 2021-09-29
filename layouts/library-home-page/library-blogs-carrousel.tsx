// core
import React from "react";

// compnents
import Blog from "../../fragments/library-items/blog";

// styles
import LibraryBlogsCarrouselStyles from "../../styles/layouts/library-home-page/LibraryBlogsCarrousel.module.css";

//types
import { blogProps } from "../../fragments/library-items/blog";

type LibraryBlogsCarrouselProps = {
   blogs: blogProps[];
};
const LibraryBlogsCarrousel = ({ blogs }: LibraryBlogsCarrouselProps) => {
   // ===============   FUNCTION 1: fetch the podcast =====================//
   return (
      <div className={`${LibraryBlogsCarrouselStyles.mainWrapper}`}>
         <h1 className={LibraryBlogsCarrouselStyles.title}>BLOGS</h1>
         <div className={LibraryBlogsCarrouselStyles.scrollSection}>
            {blogs.map((blog: blogProps) => {
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
                  />
               );
            })}
         </div>
      </div>
   );
};

export default LibraryBlogsCarrousel;
