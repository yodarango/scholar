export type TThumbsUpDownPoll = {
   id: string;
   poll: string;
   countdownLimit: string;
   votes: {
      votesUp: number;
      votesDown: number;
   };
};

export type TMultipleChicePoll = {
   id: string;
   question: string;
   options: string[];
   votes: number[];
   countTo: string;
};

export type TVideoThumbnail = {
   url: string;
   title: string;
   description: string;
};
