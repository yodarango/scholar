import { client } from "../../../apollo-client";
import { GET_IMAGES_FROM_VERSE } from "../../../graphql/reading/read";
import { errorMessages } from "../../../data/error_messages";
const unknownError = errorMessages.unknown.a;

type TGetImagesFromVerseProps = {
   VERSE_ID: string;
   last_id?: number;
};
export const getImagesFromVerse = async (variables: TGetImagesFromVerseProps) => {
   if (!variables.VERSE_ID) {
      return {
         data: [],
         error: null,
         status: "done"
      };
   }
   try {
      const { data } = await client.query({
         query: GET_IMAGES_FROM_VERSE,
         variables
      });

      if (data?.get_images_from_verses) {
         if (data?.get_images_from_verses?.__typename === "VerseImage") {
            return { data: data?.get_images_from_verses, error: null, status: "done" };
         }
      } else {
         return {
            data: null,
            error: { ...unknownError, type: "4" },
            status: "error"
         };
      }

      return {
         data: null,
         error: { ...unknownError, type: "4" },
         status: "error"
      };
   } catch (error) {
      console.error(error);
      return {
         data: null,
         error: { ...unknownError, type: "4" },
         status: "error"
      };
   }
};
