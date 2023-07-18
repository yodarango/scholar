// graphQl
import { client } from "../../../apollo-client";
import {
   GET_EDIT_ARTICLES,
   GET_ARTICLES,
   GET_ARTICLE_IN_24
} from "../../../graphql/posts/articles";

// fetch data
export const handleGetArticleIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_ARTICLE_IN_24,
         variables: {}
      });

      if (!data.article_in_24) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const article = data.article_in_24.map((c: any) => ({
         ...c,
         creator: {
            ID: c.USER_ID,
            signature: c.signature,
            authority_level: c.authority_level,
            approval_rating: c.approval_rating,
            first_name: c.first_name,
            last_name: c.last_name,
            my_church: c.my_church,
            avatar: c.avatar
         },
         comments: {
            total_comment_count: c.total_comment_count
         },
         approvals: {
            average_rating_count: c.average_rating_count,
            total_rating_count: c.total_rating_count
         }
      }));

      return { data: article, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export type TgetArticlesVariables = {
   ID?: string;
   USER_ID?: string | number;
   category_tags?: string;
   body?: string;
   last_id?: number | string;
};

const mapTheUser = (c: any) => {
   return {
      ...c,
      creator: {
         ID: c.USER_ID,
         signature: c.signature,
         authority_level: c.authority_level,
         approval_rating: c.approval_rating,
         first_name: c.first_name,
         last_name: c.last_name,
         my_church: c.my_church,
         avatar: c.avatar
      },
      comments: {
         total_count: c.total_comment_count
      },
      approvals: {
         average_count: c.average_rating_count,
         total_count: c.total_rating_count
      }
   };
};
export const handleGetArticles = async (variables: TgetArticlesVariables, isEdit?: boolean) => {
   const QUERY = isEdit ? GET_EDIT_ARTICLES : GET_ARTICLES;
   try {
      const { data } = await client.query({
         query: QUERY,
         variables
      });

      if (!data.article && !data.edit_article) {
         return { data: null, status: "error" };
      } else {
         let article: any = [];

         if (isEdit) {
            article = mapTheUser(data.edit_article);
         } else {
            article = data.article.map(mapTheUser);
         }

         return { data: article, status: "done" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
