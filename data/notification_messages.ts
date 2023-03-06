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
      title: "Form submitted successfully ✅",
      body: "Thank you for making scholar what it is. We are working every day to make it a better place for you! 👷‍♂️"
   },
   userVerificationSubmitted: {
      id: 4,
      type: "Success",
      description: "Notification after a user submits a form for verification",
      title: "Form submitted successfully ✅",
      body: "We will notify you of the final decision via the email associated with the account"
   },
   postReported: {
      id: 5,
      type: "Success",
      description: "Notification after a user reports a post",
      title: "Post has been reported 👮‍♀️",
      body: "Post is being reviewed. Thank you for making Scholar a better platform."
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
   }
};
