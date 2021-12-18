// core
import Head from "next/head";
import { GetServerSideProps } from "next";

// graphql
import client from "../apollo-client";
import { GET_COMMENTARIES } from "../graphql/home/commentaries";

// components
import CommentFilter from "../fragments/buttons/comment-filter";
import Header from "../layouts/header";
import PostsWrapper from "../layouts/posts-wrapper";
import DailyVerse from "../fragments/squares/daily-verse";
import NavigationMenu from "../layouts/navigation-menu";

// styles
import homeStyles from "../styles/pages/Home.module.css";

// Types /helpers
import { Tcommentary } from "../posts/comment";

// other (might pull form the DB using user preferences)
const versionId: string = "de4e12af7f28f599-01";

export type TverseContent = {
   id: string;
   orgId: string;
   bookId: string;
   chapterId: string;
   bibleId: string;
   reference: string;
   content: string;
   verseCount: number;
   copyright: string;
   next: { id: string; number: string };
   previous: { id: string; number: string };
};
type homeProps = {
   verseContent: TverseContent;
   commentaries: Tcommentary[];
};

export default function Home({ verseContent, commentaries }: homeProps) {
   return (
      <>
         <div className='main-wrapper'>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"HOME"} />
            <div className={homeStyles.majorGridWrapper}>
               <div className={homeStyles.majorGridWrapperLeft}>
                  <DailyVerse verseContent={verseContent} versionId={versionId} />
               </div>
               <div className={homeStyles.majorGridWrapperRight}>
                  <h3
                     className={`std-text-block--small-title ${homeStyles.dailyVerseHeaderTitleComments}`}>
                     Comments
                  </h3>
                  <CommentFilter />
                  <PostsWrapper commentaries={commentaries} />
               </div>
            </div>
         </div>
         <div className={"large-spacer"}></div>
         <NavigationMenu />
      </>
   );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   !query.verse ? (query.verse = "JHN.3.16") : null;
   !query.last_id ? (query.last_id = "999999999") : null;
   const requ = await fetch(
      `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${query.verse}?content-type=text&include-verse-numbers=false`,
      {
         method: "GET",
         headers: {
            "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
         }
      }
   );
   const json = await requ.json();
   const content = json.data;

   //============ fetch the content

   const { data } = await client.query({
      query: GET_COMMENTARIES,
      variables: {
         VERSE_ID: query.verse,
         last_id: query.last_id,
         ID: null,
         USER_ID: null,
         category_tags: null,
         authority_level: null
      }
   });
   console.log(data.v_by_v_commentaries);
   return {
      props: {
         verseContent: content,
         commentaries: data.v_by_v_commentaries
      }
   };
};
