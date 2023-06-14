// styles
import LoginTemplate from "../components/templates/users/login";
import { UseIsNotAuth } from "../hooks/use_check_auth";

// styles
import styles from "./login.module.css";

export default function Login() {
   return (
      <UseIsNotAuth redirect='/users/@me'>
         <LoginTemplate />
      </UseIsNotAuth>
   );
}
