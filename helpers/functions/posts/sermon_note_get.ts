// graphQl
import { client } from "../../../apollo-client";
import { GET_SERMON_NOTE_IN_24, GET_SERMON_NOTES } from "../../../graphql/posts/sermon_notes";

// field types
export type TgetSermonNotesVariables = {
   ID?: string | number;
   USER_ID?: string;
   AUTHORITY_LEVEL?: string;
   body?: string;
   category_tags?: string;
   last_id?: string | number;
};

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

export const handleGetSermonNotes = async (variables: TgetSermonNotesVariables) => {
   try {
      const { data } = await client.query({
         query: GET_SERMON_NOTES,
         variables
      });

      if (!data.sermon_note) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
