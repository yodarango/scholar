// graphQl
import { client } from "../../../apollo-client";
import { GET_COMMENTARIES_IN_24, GET_COMMENTARIES } from "../../../graphql/posts/commentaries";

// field types
export type TgetcommentariesVariables = {
   ID?: string | number;
   USER_ID?: string;
   VERSE_ID?: string;
   AUTHORITY_LEVEL?: string | number;
   body?: string;
   category_tags?: string;
   last_id?: string | number;
   isSelf?: boolean;
};

// fetch data
export const handleGetCommentariesIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_COMMENTARIES_IN_24,
         variables: {}
      });

      if (!data.commentary_in_24) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const commentaries = data.commentary_in_24.map((c: any) => ({
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
      }));

      return { data: commentaries, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export const handleGetCommentaries = async (variables: TgetcommentariesVariables) => {
   if (variables.AUTHORITY_LEVEL && typeof variables.AUTHORITY_LEVEL === "string") {
      variables.AUTHORITY_LEVEL = parseInt(variables.AUTHORITY_LEVEL);
   }

   try {
      const { data } = await client.query({
         query: GET_COMMENTARIES,
         variables
      });

      if (!data.commentary) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const commentaries = data.commentary.map((c: any) => ({
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
      }));

      return { data: commentaries, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
