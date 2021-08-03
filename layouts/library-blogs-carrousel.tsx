// core
import React from "react";

// compnents
import Blog from "../fragments/library-items/blog";

// styles
import LibraryBlogsCarrouselStyles from "../styles/layouts/LibraryBlogsCarrousel.module.css";

//types
import { blogProps } from "../fragments/library-items/blog";

const LibraryBlogsCarrousel = () => {
   const allBlogs = [
      {
         thumbnail: "/images/temporary/blog.png",
         blogName: "Preaching Jesus Christ",
         author: "John Doe",
         reviews: ["23", "ef", "fww", "wefs"],
         stars: [0, 0, 0, 0],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         url: "https://danielrange/.com"
      },
      {
         thumbnail: "/images/temporary/blog.png",
         blogName: "History in our Lord Christ Times",
         author: "Thomas Doe",
         reviews: ["23", "ef", "fww", "wefs", "23", "ef", "fww", "wefs"],
         stars: [1, 1, 3, 5, 1, 1, 3, 5],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         url: "https://danielrange/.com"
      },
      {
         thumbnail: "/images/temporary/blog.png",
         blogName: "Love Him More",
         author: "Allan Doe",
         reviews: ["23", "ef", "fww", "wefs"],
         stars: [4, 2, 4, 3],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         url: "https://danielrange/.com"
      },
      {
         thumbnail: "/images/temporary/blog.png",
         blogName: "Aplogetics 101",
         author: "Peter Doe",
         reviews: ["23", "ef", "fww", "wefs", "sdf"],
         stars: [5, 5, 5, 5, 5],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         url: "https://danielrange/.com"
      },
      {
         thumbnail: "/images/temporary/blog.png",
         blogName: "Tehology 101",
         author: "Tonny Doe",
         reviews: ["23", "fww", "wefs"],
         stars: [1, 5, 2],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         url: "https://danielrange/.com"
      }
   ];

   return (
      <div className={`${LibraryBlogsCarrouselStyles.mainWrapper}`}>
         <h1 className={LibraryBlogsCarrouselStyles.title}>BLOGS</h1>
         <div className={LibraryBlogsCarrouselStyles.scrollSection}>
            {allBlogs.map((blog: blogProps) => (
               <Blog
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
