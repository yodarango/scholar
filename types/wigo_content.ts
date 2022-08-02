export type TThumbsUpDownPoll = {
   id: string;
   poll: string;
   countdownLimit: string;
   votes: {
      votesUp: number;
      votesDown: number;
   };
};
