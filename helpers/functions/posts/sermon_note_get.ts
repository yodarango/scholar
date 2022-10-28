// graphQl
import { client } from "../../../apollo-client";
import { GET_SERMON_NOTE_IN_24 } from "../../../graphql/posts/sermon_notes";

// fetch data
export const handleGetSermonNoteIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_SERMON_NOTE_IN_24,
         variables: {}
      });

      if (!data.sermon_note_in_24) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
