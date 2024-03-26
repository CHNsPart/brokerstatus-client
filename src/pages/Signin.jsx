import { useState } from "react";
import Button from "../components/Button";
import { useTranslation } from 'react-i18next';
import { login } from "../api/api";
// import { useAuth } from "../context/AuthContext";
// import { getSubdomain } from "../lib/utils";


const Signin = () => {

  const { t } = useTranslation();
  // const { isAuthenticated } = useAuth();

  // useEffect(()=>{

  //   const emailAddress = credentials.username || "";
  //   const [, domain] = emailAddress.split('@');
  //   const organization = domain.split('.')[0] ?? "";

  //   const subdomain = getSubdomain();

  //   if(!isAuthenticated && subdomain!==organization) {
  //     window.location.href = `http://${organization.toLowerCase()}.localhost:5173/`;
  //   }
  // }, [credentials.username, isAuthenticated])

  
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  
  // useEffect(() => {
  //   if (credentials && credentials.username) {
  //     const emailAddress = credentials.username;
  //     const [, domain] = emailAddress.split('@');
  //     const organization = domain ? domain.split('.')[0] : '';
  
  //     const subdomain = getSubdomain();
  
  //     if (!isAuthenticated && subdomain !== organization) {
  //       window.location.href = `http://${organization.toLowerCase()}.localhost:5173/`;
  //     }
  //   }
  // }, [credentials, isAuthenticated]);
  
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = credentials.username;
    const password = credentials.password;
  
    const user = await login(username, password);
  
    if (user) {
      // Login successful, you can navigate or perform other actions
      // console.log('Login successful:', user);
      window.location = "/home"
    } else {
      // Login failed, handle accordingly
      setErrorMsg(t('signin.error'));
    }
  };

  
  return (
    <section className="h-full w-full flex justify-center items-center ">
        <form className="border-2 p-10 rounded-xl flex flex-col gap-2 w-2/4 justify-center items-start">
            <div className="w-full flex flex-col justify-center items-center mb-5 gap-4">
              <img className="h-24 w-auto" src={`/${window.DEFAULT_THEME}.png`} alt="Logo" />
              <h2 className="text-xl text-center text-cyan-600">Sign in to Broker Portal</h2>
            </div>
            <div className="w-full flex justify-center items-center">
              {/* <label htmlFor="username" className="pr-2">{t('signin.Username')}</label> */}
              <input 
                autoComplete="off" 
                id="username" 
                type='text' 
                placeholder={t('signin.Username')} 
                value={credentials.username}
                className="min-w-full"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              {/* <label htmlFor="password" className="pr-2">{t('signin.Password')}</label> */}
              <input 
                autoComplete="off" 
                id="password" 
                type='password' 
                placeholder={t('signin.Password')} 
                value={credentials.password}
                className="min-w-full"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex justify-end items-center my-2">
              <a href="/resetpassword">
                  <p className="text-sm text-cyan-600">{t('resetPassword.forgotPassword')}</p>
              </a>
            </div>
            <div className="w-full flex justify-center items-center">
              <Button variant={"block"} onClick={handleLogin} label={t('signin.signin')} />
            </div>
            <div className="w-full flex flex-col justify-end items-end gap-2 my-2">
              <div className="flex text-sm text-cyan-600 gap-1">
                <a target="_blank" href={window.PRIVACY_LINK} rel="noreferrer">
                  <p>{t('resetPassword.privacyPolicy')}</p>
                </a>
                <span>&</span>
                <a target="_blank" href={window.TERMS_LINK} rel="noreferrer">
                  <p>{t('resetPassword.terms')}</p>
                </a>
              </div>
              <a target="_blank" href={window.RATE_LINK} rel="noreferrer">
                  <p className="text-sm text-cyan-600">{t('resetPassword.rateSheet')}</p>
              </a>
            </div>
            { errorMsg !== "" && 
              <span className="w-full text-center text-red-500">{errorMsg}</span>
            }
        </form>
    </section>
  );
}

export default Signin;
