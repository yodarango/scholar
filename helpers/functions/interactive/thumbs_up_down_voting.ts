import { client } from "../../../apollo-client";
import { GET_POLL_THUMBS_UP } from "../../../graphql/interactive/poll_thumbs_up";
//import { HANDLE_VOTE } from "../../../graphql/wigo/thursday";

// export const handleThumbsUpDownVote = async (
//    votesUp: number,
//    votesDown: number,
//    contentId: string,
//    myVote: string
// ) => {
//    try {
//       const { data } = await client.mutate({
//          mutation: HANDLE_VOTE,
//          variables: {
//             votesUp: votesUp,
//             votesDown: votesDown,
//             contentId: contentId
//          }
//       });

//       const now = Date.now() + 86400000;
//       const cookieExpiration = new Date(now);

//       // if the data saves successfully save thecookie
//       if (data.thursdayVotes) {
//          document.cookie = `thumbsAction=${myVote}; expires=${cookieExpiration};
//                path: /wigo;`;
//          return data.thursdayVotes;
//       }
//       return "Something went wrong!";
//    } catch (error) {
//       console.log(error);
//       return "Error";
//    }
// };

export const getThumbsUpPollIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_POLL_THUMBS_UP,
         variables: {}
      });

      console.log(data);
      if (!data.poll_thumbs_up_in_24) {
         return { data: null, status: "error" };
      }

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
