// graphQl
import { client } from "../../../apollo-client";
import { GET_QUOTE, GET_QUOTE_IN_24 } from "../../../graphql/posts/quotes";

// field types
export type TgetQuoteVariables = {
   ID?: string | number;
   USER_ID?: string | number;
   body?: string;
   category_tags?: string;
   last_id?: string | number;
};

// fetch data
export const handleGetQuotesIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_QUOTE_IN_24,
         variables: {}
      });

      if (!data.quote_in_24) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const quote = data.quote_in_24.map((c: any) => ({
         ...c,
         creator: {
            ID: c.USER_ID,
            signature: c.signature,
            authority_level: c.authority_level,
            approval_rating: c.approval_rating,
            first_name: c.first_name,
            last_name: c.last_name,
            my_church: c.my_church,
            avatar: c.avatar
         }
      }));

      return { data: quote, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export const handleGetQuote = async (variables: TgetQuoteVariables) => {
   try {
      const { data } = await client.query({
         query: GET_QUOTE,
         variables
      });

      if (!data.quote) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const quote = data.quote_in_24.map((c: any) => ({
         ...c,
         creator: {
            ID: c.USER_ID,
            signature: c.signature,
            authority_level: c.authority_level,
            approval_rating: c.approval_rating,
            first_name: c.first_name,
            last_name: c.last_name,
            my_church: c.my_church,
            avatar: c.avatar
         }
      }));

      return { data: quote, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
