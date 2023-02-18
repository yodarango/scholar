import { client } from "../../../apollo-client";
import { GET_FAST_FACTS_IN_24, GET_ALL_FAST_FACTS } from "../../../graphql/interactive/fast_facts";

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

export type TgetAllFastFactsVariables = {
   last_id: number;
};
export const getAllFastFacts = async (variables: TgetAllFastFactsVariables) => {
   try {
      const { data } = await client.query({
         query: GET_ALL_FAST_FACTS,
         variables
      });

      if (data && !data.fast_facts) {
         return { data: null, status: "error" };
      }

      return { data: data.fast_facts, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
