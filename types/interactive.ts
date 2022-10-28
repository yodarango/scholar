export type TThumbsUpDownPoll = {
   id: string;
   type: number;
   poll: string;
   countdownLimit: string;
   votes: {
      votesUp: number;
      votesDown: number;
   };
};

export type TMultipleChicePoll = {
   id: string;
   type: number;
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

export type TFastFacts = {
   ID: string;
   type: string;
   images: string;
   created_date?: string;
   posted_on?: string;
};
