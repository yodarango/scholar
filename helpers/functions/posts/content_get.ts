// graphQl
import { client } from "../../../apollo-client";
import { GET_ALL_POSTS } from "../../../graphql/posts/content";

type TgetAllPostsVaribles = {
   cID: number;
   qID: number;
   tID: number;
};

// fetch data
export const handleGetAllPosts = async (variables: TgetAllPostsVaribles) => {
   try {
      const { data } = await client.query({
         query: GET_ALL_POSTS,
         variables
      });

      if (!data.posts) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const posts = data.posts.map((p: any) => ({
         ...p,
         creator: {
            ID: p.USER_ID,
            signature: p.signature,
            authority_level: p.authority_level,
            approval_rating: p.approval_rating,
            first_name: p.first_name,
            last_name: p.last_name,
            my_church: p.my_church,
            avatar: p.avatar
         },
         comments: {
            total_count: p.total_comment_count
         },
         approvals: {
            average_count: p.average_rating_count,
            total_count: p.total_rating_count
         }
      }));

      return { data: posts, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
