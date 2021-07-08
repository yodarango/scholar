import registerStyles from '../styles/pages/Register.module.css';

export default function Login() {
   return (
      <div className='main-wrapper'>
         <div className={`${registerStyles.wrapFlexRow} wrap-flex-row`}>
            {/* Left side, shows on mobile*/}
            <div className={registerStyles.loginLeft}>
               <div className={registerStyles.logo}></div>
               <div className={registerStyles.title}>"...SHOW THYSELF APPROVED..."</div>
               <div className='nowrap-flex-column login-left'>
                  <input type='email' placeholder='Enter your email' className='std-input' />
                  <input type='text' placeholder='Create a username' className='std-input' />
                  <input
                     type='password'
                     placeholder='Type a strong password'
                     className='std-input'
                  />
                  <div className='std-button'>
                     <div className='std-button_gradient-text'>Sign Up</div>
                  </div>
               </div>
            </div>

            {/* Left side, hides on mobile*/}
            <div className={registerStyles.loginRigth}>
               <div className='nowrap-flex-column'>
                  <input type='email' placeholder='Enter your email' className='std-input' />
                  <input type='text' placeholder='Create a username' className='std-input' />
                  <input
                     type='password'
                     placeholder='Type a strong password'
                     className='std-input'
                  />
                  <div className='std-button'>
                     <div className='std-button_gradient-text'>Sign Up</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
