// ********************************  PURPOSE  **************** //
// *** This page will load all the available sermon-notes *** //
// *** if no parameters are passed to the link, however, **** //
// *** users can opt to organize the content by Authros ***** //
// *** going to the /authors page and redirecting back to *** //
// *** this page with the content type and userid/signatu *** //

// core
import { useEffect, useState } from "react";
import Head from "next/head";
import HeadContent from "../../SEO/head-content";
//import { GetServerSideProps, GetStaticProps } from "next";

// graphql
import client from "../../apollo-client";
import { GET_MOST_POPULAR } from "../../graphql/library/MostPopular";

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
import { Tsermon } from "../../fragments/library-items/sermon";
import { articleProps } from "../../fragments/library-items/article";
import { bookProps } from "../../fragments/library-items/book";
import { watchProps } from "../../fragments/library-items/watch";
import NavigationMenu from "../../layouts/navigation_main";

const Library = () => {
   // data
   const [articlesState, setArticlesState] = useState<{
      cont: articleProps[] | undefined;
      err: boolean;
   }>({ cont: undefined, err: false });
   const [podcastState, setPodcastState] = useState<{
      cont: podcastsProps[] | undefined;
      err: boolean;
   }>({ cont: undefined, err: false });
   const [blogsState, setBlogsState] = useState<{ cont: blogProps[] | undefined; err: boolean }>({
      cont: undefined,
      err: false
   });
   const [sermonNotesState, setSermonNotesState] = useState<{
      cont: Tsermon[] | undefined;
      err: boolean;
   }>({ cont: undefined, err: false });
   const [booksState, setBooksState] = useState<{ cont: bookProps[] | undefined; err: boolean }>({
      cont: undefined,
      err: false
   });
   const [sermonsState, setSermonsState] = useState<{
      cont: watchProps[] | undefined;
      err: boolean;
   }>({ cont: undefined, err: false });

   // get the initial data
   const getInitialData = async () => {
      try {
         const { data } = await client.query({
            query: GET_MOST_POPULAR
         });

         setArticlesState({ cont: data.getMostPopularArticles, err: false });
         setPodcastState({ cont: data.getMostPopularPodcasts, err: false });
         setBlogsState({ cont: data.getMostPopularBlogs, err: false });
         setSermonNotesState({ cont: data.getMostPopularSermonNotes, err: false });
         setBooksState({ cont: data.getMostPopularBooks, err: false });
         setArticlesState({ cont: data.getMostPopularArticles, err: false });
         setSermonsState({ cont: data.getMostPopularSermons, err: false });

         return data;
      } catch (error) {
         console.log(error);
         setArticlesState({ cont: undefined, err: true });
         setPodcastState({ cont: undefined, err: true });
         setBlogsState({ cont: undefined, err: true });
         setSermonNotesState({ cont: undefined, err: true });
         setBooksState({ cont: undefined, err: true });
         setArticlesState({ cont: undefined, err: true });
         setSermonsState({ cont: undefined, err: true });
      }
   };

   useEffect(() => {
      getInitialData();
      return () => {
         setArticlesState({ cont: undefined, err: false });
         setPodcastState({ cont: undefined, err: false });
         setBlogsState({ cont: undefined, err: false });
         setSermonNotesState({ cont: undefined, err: false });
         setBooksState({ cont: undefined, err: false });
         setArticlesState({ cont: undefined, err: false });
         setSermonsState({ cont: undefined, err: false });
      };
   }, []);

   return (
      <>
         <div className={`${libraryStyles.mainWrapper}`}>
            <Head>
               <HeadContent />
            </Head>
            <Header currPage={"LIBRARY"} />
            <LibraryMenu
               includeCategory={false}
               includeContent={true}
               includeSearch={false}
               contentButtonIcon={"🔥"}
               currentSlectedContentPage={{ popular: "#f2f2f2" }}
            />

            <LibrarySermonCarrousel sermon={sermonNotesState.cont} err={sermonNotesState.err} />

            <LibraryPodcastCarrousel podcasts={podcastState.cont} err={podcastState.err} />

            <LibraryWatchCarrousel watch={sermonsState.cont} err={sermonsState.err} />

            <LibraryBlogsCarrousel blogs={blogsState.cont} err={blogsState.err} />

            <LibraryArticleCarrousel articles={articlesState.cont} err={articlesState.err} />

            <LibraryBooksCarrousel books={booksState.cont} err={booksState.err} />
            <LibraryRecommendContennt />
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};
export default Library;

// ----------- doing away with server side rendering for now, and then reconsidering after beig in prod
// export const getServerSideProps: GetServerSideProps = async () => {
//    const { data } = await client.query({
//       query: GET_MOST_POPULAR
//    });

//    return {
//       props: {
//          articles: data.getMostPopularArticles,
//          blogs: data.getMostPopularBlogs,
//          books: data.getMostPopularBooks,
//          podcast: data.getMostPopularPodcasts,
//          sermons: data.getMostPopularSermonNotes,
//          watch: data.getMostPopularSermons
//       }
//    };
// };
