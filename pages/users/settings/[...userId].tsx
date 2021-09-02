// cote
import { GetServerSideProps } from "next";
import React from "react";

// components
import userSettingsStyles from "../../../styles/pages/users/settings/UserSettings.module.css";

const userSettings = ({ user }) => {
   return (
      <div className={userSettingsStyles.mainWrapper}>
         <div
            className={userSettingsStyles.avatar}
            style={{ backgroundImage: `url(${user.avatar})` }}></div>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { userId } = context.query;
   const req = await fetch(`http://scholar-be.herokuapp.com/users/123`);
   const user = await req.json();
   return {
      props: {
         user
      }
   };
};
export default userSettings;
