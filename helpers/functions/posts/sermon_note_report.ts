import client from "../../../apollo-client";
import { REPORT_SERMON_NOTE } from "../../../graphql/posts/sermon_notes";

export const handleReportPost = async (id: string) => {
   try {
      const { data } = await client.mutate({
         mutation: REPORT_SERMON_NOTE,
         variables: {
            SERMON_NOTE_ID: id
         }
      });

      if (data.report_sermon_note) {
         return data.report_sermon_note;
      }

      return "Something went wrong!";
   } catch (error) {
      console.log(error);
      return "Error";
   }
};
