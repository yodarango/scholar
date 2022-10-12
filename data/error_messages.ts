export const errorMessages = {
   posts: {
      maxPostCount: {
         id: 0,
         type: "error",
         description: "Users on the free tier will get this error once their max count is reached",
         title: "This is sad! 😞",
         body: "Sorry, you have exceeded the max amount of posts. Please delete some of your posts or consider supporting Scholar to gain unlimited data"
      },
      failToPostCommentary: {
         id: 1,
         type: "error",
         description:
            "A post failed to post for unknown reasons to the client. Message will be returned from the 'catch' block of a function ",
         title: "Could not post ⬆️",
         body: "Your post could not be uploaded, please try again later! If the problem persists please consider submitting a <a href='/bug-report'>bug report</a>!"
      },
      fileTooBig: {
         id: 2,
         type: "error",
         description: "Lets the user know that the file they tried to upload is too big",
         title: "File too big 🐘",
         body(size: string) {
            return `Your file is too big. Max size is ${size}, please try again!`;
         }
      }
   },
   forms: {
      failToSubmitForm: {
         id: 0,
         type: "error",
         description: "Bug Report form could not be sent for some reason.",
         title: "Unable to send form 📤",
         body: "We were unable to send your form. Please try again later. If the problem persists consider submitting a <a href='/bug-report'>bug report</a>!"
      },
      missingFormFields: {
         id: 1,
         type: "error",
         description: "in case form fields are missing this will let the user know.",
         title: "Empty fields detected 🤔",
         body: "Please make sure you have filled out all required fields!"
      }
   }
};
