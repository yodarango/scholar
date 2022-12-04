import { client } from "../../../apollo-client";
import { GET_MY_USER_SUMMARY } from "../../../graphql/users/profile";

export type TgetProfileArt = {
   ID?: string;
   isSelf?: boolean;
};

export const getProfileGetArt = async (variables: TgetProfileArt) => {
   try {
      const { data } = await client.query({
         query: GET_MY_USER_SUMMARY,
         variables
      });

      if (data && data.user_summary)
         return {
            data: data.user_summary,
            status: "done"
         };
      else
         return {
            data: null,
            status: "error"
         };
   } catch (error) {
      console.error(error);
      return {
         data: null,
         status: "error"
      };
   }
};
