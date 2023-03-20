// styles
import LoginTemplate from "../components/templates/users/login";
import { UseCheckAuth } from "../hooks/use_check_auth";

// styles
import styles from "./login.module.css";

export default function Login() {
   return (
      <UseCheckAuth redirect='/users/@me' options={{ check_is_auth: false }}>
         <LoginTemplate />
      </UseCheckAuth>
   );
}
