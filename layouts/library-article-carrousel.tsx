// core
import React from "react";

// components
import Article from "../fragments/library-items/article";

// styles
import libraryArticlesCarrouselStyles from "../styles/layouts/LibraryArticlesCarrousel.module.css";

// types
import { articleProps } from "../fragments/library-items/article";

type LibraryArticleCarrouselProps = {
   articles: articleProps[];
};
const LibraryArticleCarrousel = ({ articles }: LibraryArticleCarrouselProps) => {
   return (
      <div className={`${libraryArticlesCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryArticlesCarrouselStyles.title}>ARTICLES</h1>
         <div className={libraryArticlesCarrouselStyles.scrollSection}>
            {articles.map((article: articleProps) => (
               <Article
                  key={article.id}
                  id={article.id}
                  userId={article.userId}
                  userSignature={article.userSignature}
                  tags={article.tags}
                  colors={article.colors}
                  title={article.title}
                  author={article.author}
                  reviews={article.reviews}
                  stars={article.stars}
                  description={article.description}
                  file={article.file}
               />
            ))}
         </div>
      </div>
   );
};

export default LibraryArticleCarrousel;
