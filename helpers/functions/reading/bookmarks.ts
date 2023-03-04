// graphQl
import { client } from "../../../apollo-client";
import { GET_BOOKMARKS, POST_BOOKMARK, REMOVE_BOOKMARK } from "../../../graphql/reading/read";

/**************************************************************************************** 
Gets bookmarks for a user. 
***********************************************/
export type TBookmarksVariables = {
   ID?: string;
   CHAPTER_ID?: string;
   USER_ID: number | string;
   last_id: number | string;
};

export const handleGetBookmarks = async (variables: TBookmarksVariables) => {
   try {
      const { data } = await client.query({
         query: GET_BOOKMARKS,
         variables
      });

      if (!data.bookmarks) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

/**************************************************************************************** 
Creates a new bookmark for the specified chapter
***********************************************/
export const handlePostBookMark = async (CHAPTER_ID: string | number) => {
   try {
      const { data } = await client.query({
         query: POST_BOOKMARK,
         variables: { CHAPTER_ID }
      });

      if (!data.new_bookmark) {
         return { data: null, status: "error" };
      }
      return { data, status: "done" };
   } catch (error) {}
};

/**************************************************************************************** 
Deletes all bookmarks with the same CHAPTER_ID passed in to avoid marking the chapter as
bookmarked in case two bookmarks or more were accidentally created.
******************************************************************/
export const handleRemoveBookMark = async (CHAPTER_ID: string | number) => {
   try {
      const { data } = await client.query({
         query: REMOVE_BOOKMARK,
         variables: { CHAPTER_ID }
      });

      if (!data.new_bookmark) {
         return { data: null, status: "error" };
      }
      return { data, status: "done" };
   } catch (error) {}
};
