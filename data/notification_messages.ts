export const notificationMessages = {
   selectNewScripture: {
      type: "error",
      description: "error retuned when there is a problem pulling from the Bible API",
      title: "There was a problem ⛈",
      body: "We are having trouble pulling this passage for you right now. Please try again later!"
   },
   urlCopied: {
      type: "success",
      description: "alerts user that the a link has been copied to their clipboard",
      title: "Link Copied 🔗",
      body: "The link has been copied to your clipboard. You can share it now! "
   }
};
