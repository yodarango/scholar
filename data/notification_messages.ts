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
      id: 2,
      type: "success",
      description: "Lets user know their form was successfully submitted",
      title: "Form submitted successfully ✅",
      body: "Thank you for making scholar what it is. We are working every day to make it a better place for you! 👷‍♂️"
   }
};
