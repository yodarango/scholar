import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PortalTernary = ({ children }) => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);

      return () => setMounted(false);
   }, []);

   return mounted ? createPortal(children, document.querySelector("#myportal_ternary")) : null;
};

export default PortalTernary;
