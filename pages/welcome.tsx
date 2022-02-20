// core
import Link from "next/link";
import { useRouter } from "next/router";

//components
import NavigationMenu from "../layouts/navigation-menu";

// helpers
const Cookies = require("js-cookie");
import parseJwt from "../helpers/auth/decodeJWT";

const welcome = () => {
   // =================== Check if there is a Logged in user and fetch its data ========== /
   const router = useRouter();
   const token: string = Cookies.get("authorization");
   const parsedUser = parseJwt(token);

   return (
      <>
         <div className='main-wrapper'>
            {parsedUser && (
               <div>
                  <Link href={"/users/me"}>
                     <a className='std-button'>
                        <p className='std-button_gradient-text'>GO TO MY PROFILE</p>
                     </a>
                  </Link>
               </div>
            )}
            <div>You are not authorized #NEEDS GRAPHICS</div>
         </div>
         <NavigationMenu />
      </>
   );
};

export default welcome;
