export const notificationMessages = {
   selectNewScriptureError: {
      id: 0,
      type: "error",
      description: "error retuned when there is a problem pulling from the Bible API",
      title: "There was a problem ⛈",
      body: "We are having trouble pulling this passage for you right now. Please try again later!"
   },
   selectNewScriptureSuccess: {
      id: 1,
      type: "success",
      description: `lets the user know that the verse thyey tapped on was successfully selected. This is particularly helpful in places where the 
         user is not able to visually confirm that the verse was indeed selected. One example is when selecting a multiplicity of 
         verses in the text editor as referenced verses!`,
      title: "Verse successfully added!",
      body: "Verse successfully added! 🤗"
   },
   urlCopied: {
      id: 2,
      type: "success",
      description: "alerts user that the a link has been copied to their clipboard",
      title: "Link Copied 🔗",
      body: "The link has been copied to your clipboard. You can share it now! "
   },
   bugReportSubmitted: {
      id: 3,
      type: "success",
      description: "Lets user know their form was successfully submitted",
      title: "Form submitted!",
      body: "Thank you for making Shrood what it is. We are working every day to make it a better place for you! 👷‍♂️"
   },
   userVerificationSubmitted: {
      id: 4,
      type: "Success",
      description: "Notification after a user submits a form for verification",
      title: "Form submitted!",
      body: "We will notify you of the final decision via the email associated with the account"
   },
   postReported: {
      id: 5,
      type: "Success",
      description: "Notification after a user reports a post",
      title: "Post has been reported 👮‍♀️",
      body: "Post is being reviewed. Thank you for making Shrood a better platform."
   },
   postSuccess: {
      id: 6,
      type: "Success",
      description: "Notification after a post is uploaded successfully",
      title: "Your post is up 📃",
      body: "Hooray! Your post has been successful!"
   },
   settingsSaved: {
      id: 7,
      type: "Success",
      description: "Notification after a post is settings are saved successfully",
      title: "Settings saved successfully!",
      body: "Your changes have been saved, now everyone can know all about you 😉"
   },
   avatarSaved: {
      id: 8,
      type: "Success",
      description: "Notification after an avatar are saved successfully",
      title: "Avatar saved!",
      body: "Your avatar has been saved, you're looking great 😉"
   },
   signatureSaved: {
      id: 9,
      type: "Success",
      description: "Notification after a signature are saved successfully",
      title: "Signature changed!",
      body: "Your signature has been saved, go show off your new you ✍️"
   },
   emailSaved: {
      id: 10,
      type: "Success",
      description: "Notification after a email are saved successfully",
      title: "Email saved!",
      body: "Your email has been saved, go show off your new you ✨"
   },
   folderSaved: {
      id: 11,
      type: "Success",
      description: "A folder was saved successfully",
      title: "Folder saved!",
      body: "Your folder has been saved, start saving posts to it now!"
   },
   folderDeleted: {
      id: 12,
      type: "Success",
      description: "A folder was deleted successfully",
      title: "Folder deleted!",
      body: "Your folder and all posts that were in it were deleted"
   },
   savedToFolder: {
      id: 13,
      type: "Success",
      description: "A post was saved to folder successfully",
      title: "Post added to folder!",
      body: "your post was added to this folder successfully!"
   },
   foldersDeleted: {
      id: 14,
      type: "Success",
      description: "Many folders were deleted successfully",
      title: "Folders deleted!",
      body: "The folders you selected and all posts that were in them were deleted"
   },
   foldersMadePrivate: {
      id: 15,
      type: "Success",
      description: "Many folders were made private and all contents in them",
      title: "Folders are now private!",
      body: "The folders you selected and all posts that were in them are now private. Nobody, except you, will be able to see them."
   },
   foldersMadePublic: {
      id: 16,
      type: "Success",
      description: "Many folders were made public and all contents in them ",
      title: "Folders are now public!",
      body: "The folders you selected and all posts that were in them are now public. Please be aware that everyone can see them."
   },
   aboutMeSaved: {
      id: 17,
      type: "Success",
      description: "A user's about me was saved successfully",
      title: "Greaattt!",
      body: "Your description has been saved, now everyone can know all about you"
   },
   passwordSaved: {
      id: 18,
      type: "Success",
      description: "Notification after a password is changed successfully",
      title: "Password changed!",
      body: "Your password has been changed. Please save it in a secure place."
   },
   verificationCodeSent: {
      id: 19,
      type: "Success",
      description: "Notification after a verification code is sent successfully",
      title: "Verification code sent!",
      body: (email: string) =>
         "A new verification code has been sent to " +
         email +
         " (don't forget to check your spam!)."
   },
   AIImageCreated: {
      id: 20,
      type: "Success",
      description: "Notification after an AI image has been created code is sent successfully",
      title: "Woot woot! Image Saved!",
      body: "Great, your image has been saved to your profile!"
   }
};
