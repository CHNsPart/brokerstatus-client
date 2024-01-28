import { useState } from "react";
import Button from "../components/Button";
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleAuth = (e) => {
    e.preventDefault();
    console.log(credentials)
  }

  
  return (
    <section className="h-full w-full flex justify-center items-center ">
        <form className="border-2 p-10 rounded-xl flex flex-col gap-2 min-w-1/2 bg-zinc-100 justify-center items-start">
            <div className="w-full flex justify-between items-center">
                <label htmlFor="username" className="pr-2">{t('signin.Username')}</label>
                <input 
                  autoComplete="off" 
                  id="username" 
                  type='text' 
                  placeholder={t('signin.Username')} 
                  value={credentials.username}
                  onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-between items-center">
                <label htmlFor="password" className="pr-2">{t('signin.Password')}</label>
                <input 
                  autoComplete="off" 
                  id="password" 
                  type='password' 
                  placeholder={t('signin.Password')} 
                  value={credentials.password}
                  onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-end items-center">
                <a href="/resetpassword">
                    <p className="text-xs">{t('resetPassword.resetPassword')}</p>
                </a>
            </div>
            <div className="w-full flex justify-center items-center">
                <Button onClick={handleAuth} label={t('signin.signin')} />
            </div>
        </form>
    </section>
  );
}

export default Signin;