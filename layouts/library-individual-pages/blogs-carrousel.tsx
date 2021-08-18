// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** watch component by calling a map on the props  ************ //
// *** passed in this component, which is an array of the ******** //
// *** watch fetched from the library. *************************** //

// core
import React from "react";

//components
import Blog from "../../fragments/library-items/blog";

// styles
import blogCarrouselStyles from "../../styles/layouts/library-individual-pages/BlogCarrousel.module.css";

// helpers:types
import { blogProps } from "../../fragments/library-items/blog";

type blogCarrouselProps = {
   blogs: blogProps[];
};

const BlogCarrousel = ({ blogs }: blogCarrouselProps) => {
   return (
      <div className={blogCarrouselStyles.mainWrapper}>
         <div className={blogCarrouselStyles.gridWrapper}>
            {blogs.map((blog: blogProps) => (
               <Blog
                  id={blog.id}
                  key={blog.id}
                  thumbnail={blog.thumbnail}
                  blogName={blog.blogName}
                  author={blog.author}
                  reviews={blog.reviews}
                  stars={blog.stars}
                  url={blog.url}
                  description={blog.description}
                  newClass={blogCarrouselStyles.blogMainWrapper}
               />
            ))}

            {/* ====== TEMPORARY data jsut to create more content ======= */}
            {blogs.map((blog: blogProps) => (
               <Blog
                  id={blog.id}
                  key={blog.id}
                  thumbnail={blog.thumbnail}
                  blogName={blog.blogName}
                  author={blog.author}
                  reviews={blog.reviews}
                  stars={blog.stars}
                  url={blog.url}
                  description={blog.description}
                  newClass={blogCarrouselStyles.blogMainWrapper}
               />
            ))}
         </div>
      </div>
   );
};

export default BlogCarrousel;
