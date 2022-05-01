// core
import React from "react";
import Image from "next/image";

// components
import Article from "../../fragments/library-items/article";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

// styles
import libraryArticlesCarrouselStyles from "../../styles/layouts/library-home-page/LibraryArticlesCarrousel.module.css";
import cardsLazyLoadingStyle from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { articleProps } from "../../fragments/library-items/article";

type LibraryArticleCarrouselProps = {
   articles: articleProps[] | undefined;
   err: boolean;
};
const LibraryArticleCarrousel = ({ articles, err }: LibraryArticleCarrouselProps) => {
   return (
      <div className={`${libraryArticlesCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryArticlesCarrouselStyles.title}>ARTICLES</h1>
         <div className={libraryArticlesCarrouselStyles.scrollSection}>
            {articles &&
               articles.map((article: articleProps) => {
                  return (
                     <Article
                        key={article.id}
                        id={article.id}
                        userId={article.userId}
                        categoryTags={article.categoryTags}
                        tagColors={article.tagColors}
                        title={article.title}
                        author={article.user === null ? "" : article.user.fullName}
                        currentRanking={article.currentRanking}
                        totalReviews={article.totalReviews}
                        description={article.description}
                        fileUrl={article.fileUrl}
                     />
                  );
               })}

            {!articles && !err && (
               <CardsLazyLoading
                  amount={10}
                  compClass={cardsLazyLoadingStyle.libraryHomePageLong}
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

export default LibraryArticleCarrousel;
