// core
import React from "react";

// compnents
import Blog from "../fragments/library-items/blog";

// styles
import LibraryBlogsCarrouselStyles from "../styles/layouts/LibraryBlogsCarrousel.module.css";

//types
import { blogProps } from "../fragments/library-items/blog";

type LibraryBlogsCarrouselProps = {
   blogs: blogProps[];
};
const LibraryBlogsCarrousel = ({ blogs }: LibraryBlogsCarrouselProps) => {
   // ===============   FUNCTION 1: fetch the podcast =====================//
   return (
      <div className={`${LibraryBlogsCarrouselStyles.mainWrapper}`}>
         <h1 className={LibraryBlogsCarrouselStyles.title}>BLOGS</h1>
         <div className={LibraryBlogsCarrouselStyles.scrollSection}>
            {blogs.map((blog: blogProps) => (
               <Blog
                  id={blog.id}
                  key={blog.id}
                  thumbnail={blog.thumbnail}
                  author={blog.author}
                  description={blog.description}
                  url={blog.url}
                  reviews={blog.reviews}
                  stars={blog.stars}
                  blogName={blog.blogName}
               />
            ))}
         </div>
      </div>
   );
};

export default LibraryBlogsCarrousel;
