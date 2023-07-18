import { useState } from "react";
import { client } from "../../../apollo-client";
import {
   CONTENT_TYPE_FOLDER,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_ARTICLE
} from "../../../constants/defaults";
import { DELETE_ONE_COMMENTARY } from "../../../graphql/posts/commentaries";
import { DELETE_FOLDER } from "../../../graphql/posts/folders";
import { DELETE_ONE_QUOTE } from "../../../graphql/posts/quotes";
import { DELETE_ONE_ARTICLE } from "../../../graphql/posts/articles";
import { EnumContentType } from "../../../types/enums";

export const useDeleteContent = () => {
   const [data, setData] = useState<any>({ ID: null, error: null, status: "loading" });

   const handleDelete = async (id: string | number, type: EnumContentType) => {
      let CTYPE;
      switch (type) {
         case POST_TYPE_COMMENTARY:
            CTYPE = DELETE_ONE_COMMENTARY;
            break;
         case POST_TYPE_QUOTE:
            CTYPE = DELETE_ONE_QUOTE;
            break;
         case POST_TYPE_ARTICLE:
            CTYPE = DELETE_ONE_ARTICLE;
            break;
         case CONTENT_TYPE_FOLDER:
            CTYPE = DELETE_FOLDER;
            break;
         default:
            CTYPE = DELETE_ONE_COMMENTARY;
      }

      try {
         const { data } = await client.mutate({
            mutation: CTYPE,
            variables: { ID: id }
         });

         if (data.delete_one_commentary)
            setData({ ...data.delete_one_commentary, status: "success" });
         else if (data.delete_one_quote) setData({ ...data.delete_one_quote, status: "success" });
         else if (data.delete_one_article)
            setData({ ...data.delete_one_article, status: "success" });
         else if (data.delete_folder) setData({ ...data.delete_folder, status: "success" });

         setData({ ID: null, error: "something went wrong", status: "error" });
      } catch (error) {
         console.error(error);
         setData({ ID: null, error: "something went wrong", status: "error" });
      }
   };

   return { data, handleDelete };
};
