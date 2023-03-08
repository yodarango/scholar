import { client } from "../../../apollo-client";
import { BUG_REPORT } from "../../../graphql/feedback/users";

export type Tvariables = {
   where: string;
   when: string;
   who: string;
   how: string;
};

export const handleBugReport = async (variables: Tvariables) => {
   try {
      const { data } = await client.mutate({
         mutation: BUG_REPORT,
         variables
      });

      if (data.new_bug_report) return { data, status: "done" };
      else return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "done" };
   }
};
