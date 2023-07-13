import { client } from "../../../apollo-client";
import { KEEP_VERSE_TO_IMAGE } from "../../../graphql/reading/read";

type TChapterSummaryVote = {
   VERSE_ID: string;
};

export const useKeepImageToVerse = async (variables: TChapterSummaryVote) => {
   try {
      const { data } = await client.mutate({
         mutation: KEEP_VERSE_TO_IMAGE,
         variables
      });

      if (data.keep_verse_to_image) {
         if (data.keep_verse_to_image.__typename === "ExceedsPostCount") {
            return { data: null, error: "Unable to save image", status: "exceedsPostCount" };
         } else if (data.keep_verse_to_image.__typename === "ServerError") {
         } else if (data?.keep_verse_to_image.__typename === "VerseImage") {
            return { data: data?.keep_verse_to_image, error: null, status: "done" };
         } else {
            return {
               data: null,
               error: "Unable to save image",
               status: "error"
            };
         }
      }

      return {
         data: null,
         error: "Unable to save image",
         status: "error"
      };
   } catch (error) {
      console.error(error);
      return {
         data: null,
         error: error,
         status: "error"
      };
   }
};
