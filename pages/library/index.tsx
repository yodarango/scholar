// ********************************  PURPOSE  **************** //
// *** This page will load all the available sermon-notes *** //
// *** if no parameters are passed to the link, however, **** //
// *** users can opt to organize the content by Authros ***** //
// *** going to the /authors page and redirecting back to *** //
// *** this page with the content type and userid/signatu *** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import Header from "../../layouts/header";
import LibraryMenu from "../../fragments/buttons/library-menu";
import LibraryPodcastCarrousel from "../../layouts/library-home-page/library-podcast-carrousel";
import LibraryWatchCarrousel from "../../layouts/library-home-page/library-watch-carrousel";
import LibraryBlogsCarrousel from "../../layouts/library-home-page/library-blogs-carrousel";
import LibrarySermonCarrousel from "../../layouts/library-home-page/library-sermon-carrousel";
import LibraryArticleCarrousel from "../../layouts/library-home-page/library-article-carrousel";
import LibraryBooksCarrousel from "../../layouts/library-home-page/library-books-carrousel";
import LibraryRecommendContennt from "../../fragments/buttons/library-recommend-contennt";

// styles
import libraryStyles from "../../styles/pages/library/Library.module.css";

// helpers: types
import { podcastsProps } from "../../fragments/library-items/podcast";
import { blogProps } from "../../fragments/library-items/blog";
import { sermonProps } from "../../fragments/library-items/sermon";
import { articleProps } from "../../fragments/library-items/article";
import { bookProps } from "../../fragments/library-items/book";
import { watchProps } from "../../fragments/library-items/watch";

type libraryProps = {
   podcasts: podcastsProps[];
   blogs: blogProps[];
   sermons: sermonProps[];
   articles: articleProps[];
   books: bookProps[];
   watch: watchProps[];
};
const Library = ({ podcasts, blogs, sermons, articles, books, watch }: libraryProps) => {
   return (
      <div className={`${libraryStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"LIBRARY"} />
         <LibraryMenu
            includeCategory={false}
            includeContent={true}
            includeSearch={false}
            contentButtonIcon={"🔥"}
            currentSlectedContentPage={{ popular: "#f2f2f2" }}
         />
         {sermons && <LibrarySermonCarrousel sermon={sermons} />}
         {podcasts && <LibraryPodcastCarrousel podcasts={podcasts} />}
         {watch && <LibraryWatchCarrousel watch={watch} />}
         {blogs && <LibraryBlogsCarrousel blogs={blogs} />}
         {articles && <LibraryArticleCarrousel articles={articles} />}
         {books && <LibraryBooksCarrousel books={books} />}
         <LibraryRecommendContennt />
      </div>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();
   return {
      props: {
         podcasts: parsedData.podcast,
         blogs: parsedData.blogs,
         sermons: parsedData.sermons,
         articles: parsedData.articles,
         books: parsedData.books,
         watch: parsedData.watch
      },
      revalidate: 60 * 60 * 24 // everyday
   };
};
export default Library;
