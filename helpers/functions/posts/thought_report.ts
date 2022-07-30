import client from "../../../apollo-client";
import { REPORT_THOUGHT } from "../../../graphql/posts/thoughts";

export const handleReportPost = async (id: string) => {
   try {
      const { data } = await client.mutate({
         mutation: REPORT_THOUGHT,
         variables: {
            THOUGHT_ID: id
            //  USER_ID: 1
         }
      });

      if (data.report_thought) {
         return data.report_thought;
      }
      return "Something went wrong";
   } catch (error: any) {
      console.log(error);
      return "Error";
   }
};
