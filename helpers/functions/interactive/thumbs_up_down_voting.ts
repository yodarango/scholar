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
      const {
         data,
         data: { poll_thumbs_up_in_24 }
      } = await client.query({
         query: GET_POLL_THUMBS_UP,
         variables: {}
      });

      let votes: any = { votesUp: null, votesDown: null };

      if (poll_thumbs_up_in_24) {
         // parse votes as they come in string
         if (poll_thumbs_up_in_24.votes) {
            if (poll_thumbs_up_in_24.votes.vote) {
               const votesArray = poll_thumbs_up_in_24.votes.vote.split(" ");
               votes.votesUp = votesArray[0];
               votes.votesDown = votesArray[1];

               poll_thumbs_up_in_24.votes = {
                  ...poll_thumbs_up_in_24.votes,
                  votesUp: parseInt(votes.votesUp),
                  votesDown: parseInt(votes.votesDown)
               };
            } else {
               poll_thumbs_up_in_24.votes.vote = {
                  ID: null,
                  type: null,
                  POLL_ID: null,
                  votesUp: 0,
                  votesDown: 0
               };
            }
            return { data, status: "done" };
         } else {
            poll_thumbs_up_in_24.votes = {
               ID: null,
               type: null,
               POLL_ID: null,
               votesUp: 0,
               votesDown: 0
            };

            return { data, status: "done" };
         }
      }

      return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
