import client from "../../../apollo-client";
import { REPORT_COMMENTARY } from "../../../graphql/posts/commentaries";

export const handleReportCommentary = async (id: string) => {
   try {
      const { data } = await client.mutate({
         mutation: REPORT_COMMENTARY,
         variables: {
            COMMENTARY_ID: id
         }
      });

      if (data.report_commentary) {
         return data.report_commentary;
      }
      return "Something went wrong";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
