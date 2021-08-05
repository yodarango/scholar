// core
import React from "react";

// styles
import congregationStyles from "../../styles/fragments/library-items/Congregation.module.css";

export type congregationProps = {
   address: string;
   city: string;
   id: string;
   location: string;
   logo: string;
   name: string;
   schedule: string[];
   state: string;
   zip: string;
};
const Congregation = ({
   address,
   city,
   id,
   location,
   logo,
   name,
   schedule,
   state,
   zip
}: congregationProps) => {
   return <div></div>;
};

export default Congregation;
