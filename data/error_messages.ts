export const errorMessages = {
   posts: {
      maxPostCount: {
         id: 1,
         type: "error",
         description: "Users on the free tier will get this error once their max count is reached",
         title: "This is sad! 😞",
         body: "Sorry, you have exceeded the max amount of posts. Please delete some of your posts or consider supporting Scholar to gain unlimited data"
      },
      failToPostCommentary: {
         id: 2,
         type: "error",
         description:
            "A post failed to post for unknown reasons to the client. Message will be retruned from the 'catch' block of a function ",
         title: "Something went south ⬇️",
         body: "We are on it and shall have this issue out of the way soon. Please try again later"
      },
      fileTooBig: {
         type: "error",
         description: "Lets the user know that the file they tried to upload is too big",
         title: "File too big 🐘",
         body(size: string) {
            return `Your file is too big. Max size is ${size}, please try again!`;
         }
      }
   }
};
