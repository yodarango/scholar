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
import { useRouter } from "next/router";

// graphql
import client from "../../../apollo-client";
import { GET_BLOGS } from "../../../graphql/library/blogs";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import BlogCarrousel from "../../../layouts/library-individual-pages/blogs-carrousel";
import SkipContent from "../../../fragments/buttons/skipContent";

// styles
import libraryBlogsStyles from "../../../styles/pages/library/blogs/LibraryBlogs.module.css";

// types
import { blogProps } from "../../../fragments/library-items/blog";
import NavigationMenu from "../../../layouts/navigation-menu";
import LibraryFilterBlog from "../../../fragments/buttons/library-filter-blog-author";

type watchPageProps = {
   blogs: blogProps[];
};

const Blogs = ({ blogs }: watchPageProps) => {
   // ============ capitalize and push the new query to router to searh by title ======
   const router = useRouter();
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substr(1));
         console.log(newInput);
      }

      router.replace({ pathname: router.pathname, query: { blogName: newInput } });
   };
   return (
      <>
         <div className={`${libraryBlogsStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"BLOGS"} />
            <SkipContent wrapperMaxWidth={"1050px"} content={blogs} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={false}
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
   let { skip, alphOrd, dateOrd, userId, id, blogName } = context.query;
   const { data } = await client.query({
      query: GET_BLOGS,
      variables: { skip, alphOrd, dateOrd, userId, blogName, id }
   });
   console.log(blogName);
   return {
      props: {
         blogs: data.blogs
      }
   };
};

export default Blogs;
