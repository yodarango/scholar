import { client } from "../../../apollo-client";
import { GET_FAST_FACTS_IN_24 } from "../../../graphql/interactive/fast_facts";

export const getFastFactsIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_FAST_FACTS_IN_24,
         variables: {}
      });

      if (data && !data.fast_facts_in_24) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
