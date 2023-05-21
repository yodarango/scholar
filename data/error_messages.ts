export const errorMessages = {
   account: {
      emailNotFound: {
         id: 0,
         type: "error",
         description:
            "Check user's email to see if it exists. This is specially useful on password recovery.",
         title: "Email Not Found 🔎",
         body: "Sorry! the email address provided was not found. Please try again"
      },
      wrongVerificationCode: {
         id: 1,
         type: "error",
         description: "if the user inserts incorrect account verification code",
         title: "Wrong code ❌",
         body: "The code you entered is incorrect or has expired, please try again!"
      },
      unableToUpdatePassword: {
         id: 2,
         type: "error",
         description: "if the user is unable to update their password",
         title: "Oh no! 😔",
         body: "We were unable to update your password, please try again later!"
      },
      unableToUpdateAvatar: {
         id: 3,
         type: "error",
         description: "if the avatar is unable to update their password",
         title: "Oh no! 🙉",
         body: "We were unable to update your avatar, please try again later!"
      },
      unableToUpdateSignature: {
         id: 4,
         type: "error",
         description:
            "if the avatar is unable to update their signature either because it has already been taken or because something went wrong",
         title: "Oh rats! 🐀",
         body: "We were unable to update your signature, please try again later!"
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
         title: "Fields empty 🤔",
         body: "Please make sure you have filled out all required fields!"
      },
      missingEmail: {
         id: 2,
         type: "error",
         description:
            "during password recovery the user is asked to enter their email. If empty this error will show",
         title: "Please enter email 📧",
         body: "Email field cannot be empty!"
      },
      missingCode: {
         id: 2,
         type: "error",
         description:
            "during password recovery the user is asked to enter the pass code sent to their email. If empty this error will show",
         title: "Please enter code 📥",
         body: "Code field cannot be empty!"
      },
      missingPassword: {
         id: 2,
         type: "error",
         description:
            "during password recovery the user is asked to enter the new password. If empty this error will show",
         title: "Please enter new password 🪪",
         body: "Password field cannot be empty!"
      },
      invalidEmailAddress: {
         id: 3,
         type: "error",
         description: "If the email address the user entered is not a lid format",
         title: "Invalid email ＠",
         body: "The email you entered is not valid. Try another one!"
      }
   },
   posts: {
      maxPostCount: {
         id: 0,
         type: "error",
         description: "Users on the free tier will get this error once their max count is reached",
         title: "This is sad! 😞",
         body: "Sorry, you have exceeded the max amount of posts. Please delete some of your posts or consider supporting Shrood to gain unlimited data"
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
      },
      missingCategoryTag: {
         id: 3,
         type: "error",
         description: "shows if a category tag is not selected. ",
         title: "You must select a category 🏷",
         body: "Your post does not have a category. Please select one and try again!"
      },
      missingVerse: {
         id: 4,
         type: "error",
         description: "shows if a verse to comment on is not selected. ",
         title: "You must select a verse 📖",
         body: "Please select the verse you would like to comment on before continuing"
      },
      emptyBody: {
         id: 5,
         type: "error",
         description: "post body cannot be empty ",
         title: "Empty text box 📭",
         body: "That text box looks better when it has text on it 😉"
      },
      missingTitle: {
         id: 6,
         type: "error",
         description: "post title cannot be empty ",
         title: "Title must be provided 📰",
         body: "How about we enter a title to make your post searchable? "
      },
      missingAuthor: {
         id: 7,
         type: "error",
         description: "users must enter an author quote",
         title: "Do you know the author? 🖋",
         body: "Please give the author credit or type unknown if you don't know!"
      },
      failedToDeletePost: {
         id: 8,
         type: "error",
         description: "when a posts fails to delete",
         title: "Deletion failed ",
         body: "Sorry, we were unable to delete this post. Please try again later!"
      },
      failedToDeleteFolder: {
         id: 9,
         type: "error",
         description: "when a folder fails to delete",
         title: "Deletion failed ",
         body: "Sorry, we were unable to delete this folder. Please try again later!"
      },
      failedToSaveFolder: {
         id: 10,
         type: "error",
         description: "when a folder fails to save",
         title: "Folder not saved",
         body: "Sorry, the folder was not able to be saved, try again!"
      },
      failedToSaveToFolder: {
         id: 11,
         type: "error",
         description: "when a post fails to be added to folder",
         title: "Could not add post",
         body: "Sorry, this post was not able to be added to the folder, try again later!"
      },
      failToPerformBulkActionOnFolders: {
         id: 12,
         type: "error",
         description: "when an array of folders fail to perform a certain bulk action",
         title: "Could not perform operation",
         body: "Sorry, the selected folders were not updated, try again later!"
      }
   },
   read: {
      noHighlightVerses: {
         id: 1,
         type: "warning",
         description:
            "highlight verse returned null or undefined or something else that is not an array ",
         title: "No highlights",
         body: "We did not find any highlighted verses "
      },
      noChapterRefs: {
         id: 2,
         type: "warning",
         description:
            "reference comments of chapter verse returned null or undefined or something else that is not an array ",
         title: "No commentary refs",
         body: "We did not find any commentary references "
      }
   },
   login: {
      failToLogin: {
         id: 0,
         type: "error",
         description: "if we fail to login a user but have no idea why",
         title: "Login error!",
         body: "Sorry, we were unable to log you in. If the error persist contact us. "
      }
   },
   register: {
      failToRegister: {
         id: 0,
         type: "error",
         description: "if we fail to register a user for a specific reason",
         title: "Registration error! ",
         body: "Sorry, we were unable to register your account. If the error persist contact us."
      }
   },
   unknown: {
      a: {
         id: 2,
         type: "error",
         description: "if the user inserts incorrect account verification code",
         title: "Oops 🙈",
         body: "Something has gone south and we're at it, please try again later!"
      }
   },
   auth: {
      pleaseLogin: {
         id: 1,
         type: "error",
         description: "user needs to login before they can execute a particular action",
         title: "You're not logged in",
         body: "You must be logged in to perform this action! Please login and try again!"
      }
   }
};
