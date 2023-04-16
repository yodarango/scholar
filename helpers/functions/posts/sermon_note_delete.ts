import client from "../../../apollo-client";
import { DELETE_ONE_SEMRON_POST } from "../../../graphql/posts/sermon_notes";

export const handleDeleteSermonNote = async (id: string) => {
   try {
      const { data } = await client.mutate({
         mutation: DELETE_ONE_SEMRON_POST,
         variables: { ID: id }
      });

      if (data.x) {
         return data.x;
      }

      return "Something went wrong!";
   } catch (error) {
      console.error(error);
      return "Error";
   }
};

export const handleDeleteSermonNoteFromDropBox = async (id: string, DROPBOX_ID: string) => {
   try {
      const request = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
         method: "POST",
         body: `{"path": "${DROPBOX_ID}"}`,
         headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
         }
      });
      if (request.status === 200) {
         return "post delteted successfully";
      }

      return "Something went wrong";
   } catch (error) {
      console.error(error);
      return "Error";
   }
};
