import { useEffect, useState } from "react";
import { client } from "../../../apollo-client";
import { GET_CHAPTER_COMMENTARIES_REFS } from "../../../graphql/reading/read";

export type TUseGetChapterDataVariables = {
   ID?: string;
   VERSE_ID?: string;
   USER_ID?: number | string;
   last_id: number | string;
};

//! Not used right now. The call before is used intead because chapter modal rerenders of scroll.
export const useGetChapterData = (variables: TUseGetChapterDataVariables | undefined) => {
   const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
   const [data, setData] = useState<any>(null);

   const fetData = async () => {
      setStatus("loading");
      try {
         const { data } = await client.query({
            query: GET_CHAPTER_COMMENTARIES_REFS,
            variables
         });

         if (!data.chapter_data) {
            setData(null);
            setStatus("error");
         }
         setData(data.chapter_data);
         setStatus("done");
      } catch (error) {
         console.error(error);
         setData(null);
         setStatus("error");
      }
   };

   useEffect(() => {
      if (variables) fetData();
   }, []);

   return { data, status };
};

export const handleGetChapterRefs = async (variables: TUseGetChapterDataVariables) => {
   try {
      const { data } = await client.query({
         query: GET_CHAPTER_COMMENTARIES_REFS,
         variables
      });

      if (!data.chapter_commentary_refs) {
         return { data: null, status: "error" };
      }

      return { data: data.chapter_commentary_refs, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
