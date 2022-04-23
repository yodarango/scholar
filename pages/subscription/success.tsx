import React from "react";

const success = () => {
   return (
      <section>
         <div className='product Box-root'>
            <div className='description Box-root'>
               <h3>Subscription to Starter plan successful!</h3>
            </div>
         </div>
         <form action='/create-portal-session' method='POST'>
            <input type='hidden' id='session-id' name='session_id' value='' />
            <button id='checkout-and-portal-button' type='submit'>
               Manage your billing information
            </button>
         </form>
      </section>
   );
};

export default success;
