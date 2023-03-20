import RegisterTemplate from "../components/templates/users/register";
import { UseCheckAuth } from "../hooks/use_check_auth";

export default function Register() {
   return (
      <UseCheckAuth redirect='/users/@me' options={{ check_is_auth: false }}>
         <RegisterTemplate />
      </UseCheckAuth>
   );
}
