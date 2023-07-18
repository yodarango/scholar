import { RATE_COMMENT, RATE_QUOTE, RATE_ARTICLE } from "../../../graphql/posts/rating";
import { client } from "../../../apollo-client";

// type
import { EnumContentType } from "../../../types/enums";

export type TrateContent = {
   POST_ID: number | string;
   USER_ID: number | string;
   rating: number;
};

export const rateContent = async (variables: TrateContent, contentType: EnumContentType) => {
   const RATE_CONTENT =
      contentType === 1 ? RATE_COMMENT : contentType === 2 ? RATE_QUOTE : RATE_ARTICLE;
   const queryName =
      contentType === 1 ? "rate_commentary" : contentType === 2 ? "rate_quote" : "rate_article";
   const responseName =
      contentType === 1
         ? "Commentary_Rating"
         : contentType === 2
         ? "Quote_Approval"
         : "Article_Approval";
   try {
      const { data } = await client.mutate({
         mutation: RATE_CONTENT,
         variables
      });

      if (data[queryName].__typename === responseName) {
         return { data, status: "done" };
      } else if (data[queryName].__typename === "ServerError") {
         return { data: null, status: "error" };
      } else return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
