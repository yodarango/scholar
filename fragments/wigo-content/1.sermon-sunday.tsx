import React from "react";

// styles
import sermonSundayStyles from "../../styles/fragments/wigo-content/SermonSunday.module.css";

const SermonSunday = () => {
   return (
      <div className={`${sermonSundayStyles.mainWrapper}`}>
         <h2 className={`${sermonSundayStyles.title}`}>Sermon Suday</h2>
         <p className={`std-text-block ${sermonSundayStyles.parragraph}`}>
            This week the fatured sermon is <b>{`Sermon Title`}</b> by <b>{`Preacher`}</b>. We hope
            it is a blessing to your sunday! 😊
         </p>

         <iframe
            className={`${sermonSundayStyles.iframe}`}
            id='ytplayer'
            typeof={"text/html"}
            src='https://www.youtube.com/embed/6wA5tfK48io?autoplay=1&loop=1&modestbranding=1&playsinline=1'
            frameBorder='0'
            allowFullScreen></iframe>
      </div>
   );
};

export default SermonSunday;
