// ************************** PURPOSE **************************** //
// *** This page component will fetch all the blogs found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/blogs page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

// graphql
import { gql } from "@apollo/client";
import client from "../../../apollo-client";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import BlogCarrousel from "../../../layouts/library-individual-pages/blogs-carrousel";

// styles
import libraryBlogsStyles from "../../../styles/pages/library/blogs/LibraryBlogs.module.css";

// types
import { blogProps } from "../../../fragments/library-items/blog";
import NavigationMenu from "../../../layouts/navigation-menu";
import LibraryFilterBlog from "../../../fragments/buttons/library-filter-blog-author";
import Podcast from "../podcast";

type watchPageProps = {
   blogs: blogProps[];
};

const Blogs = ({ blogs }: watchPageProps) => {
   return (
      <>
         <div className={`${libraryBlogsStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"BLOGS"} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"📑"}
               currentSlectedContentPage={{ blogs: "#f2f2f2" }}
            />
            <LibraryFilterBlog />
            {blogs && <BlogCarrousel blogs={blogs} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip } = context.query;
   if (!skip) {
      skip = "0";
   }
   const { data } = await client.query({
      query: gql`
         query ($skip: String!) {
            blogs(skip: $skip) {
               id
               thumbnail
               blogName
               blogUrl
               currentRanking
               user {
                  fullName
               }
            }
         }
      `,
      variables: { skip: skip }
   });

   return {
      props: {
         blogs: data.blogs
      }
   };
};

export default Blogs;
