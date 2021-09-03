// core
import Link from "next/link";

// styles
import loginStyles from "../styles/pages/Login.module.css";

export default function Login() {
   return (
      <div className='main-wrapper'>
         <div className={loginStyles.loginLogo}></div>
         <div className={loginStyles.loginTitle}>"...SHOW THYSELF APPROVED..."</div>
         <div className='nowrap-flex-column'>
            <input type='text' placeholder='Username' className='std-input' />
            <input type='password' placeholder='Password' className='std-input' />
            <div className='std-button'>
               <div className='std-button_gradient-text'>Login</div>
            </div>
            <p className='std-text-block--info'>Don't have an account yet? </p>
            <Link href='/register'>
               <a className='std-button std-button--no-margin std-button--clear'>
                  <div className='std-button_gradient-text'>Sign Up</div>
               </a>
            </Link>
            <div className='large-spacer'></div>
         </div>
      </div>
   );
}
