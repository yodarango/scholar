import { client } from "../../../apollo-client";
import { GET_IMAGE_FROM_BIBLE_VERSE } from "../../../graphql/reading/read";
import { errorMessages } from "../../../data/error_messages";
const unknownError = errorMessages.unknown.a;

export const getImageFromBibleVerse = async (VERSE_ID: string, prompt?: string) => {
   if (!VERSE_ID) return { data: [], error: null, status: "done" };

   try {
      const { data } = await client.query({
         query: GET_IMAGE_FROM_BIBLE_VERSE,
         variables: {
            VERSE_ID,
            prompt: prompt || null
         }
      });

      if (data?.get_Bible_verse_image) {
         if (data?.get_Bible_verse_image?.__typename === "VerseImage") {
            return { data: data?.get_Bible_verse_image, error: null, status: "done" };
         } else if (data?.get_Bible_verse_image?.__typename === "NotAuthorized") {
            return {
               data: null,
               error: "notAuth",
               status: "error"
            };
         } else if (data.get_Bible_verse_image.__typename === "ExceedsPostCount") {
            return { data: null, error: "Unable to save image", status: "exceedsPostCount" };
         } else {
            return { data: null, error: "Unable to save image", status: "error" };
         }
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
