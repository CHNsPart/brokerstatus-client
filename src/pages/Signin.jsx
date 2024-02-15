import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useTranslation } from 'react-i18next';
import { login } from "../api/api";
import { useAuth } from "../context/AuthContext";


const Signin = () => {

  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  useEffect(()=>{
    isAuthenticated? window.location.replace("/home") : ""
  })

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

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
      console.log('Login successful:', user);
      window.location = "/home"
    } else {
      // Login failed, handle accordingly
      setErrorMsg(t('Wrong Credintials!'));
    }
  };

  
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
                <Button onClick={handleLogin} label={t('signin.signin')} />
            </div>
            { errorMsg !== "" && 
              <span className="w-full text-center text-red-500">{errorMsg}</span>
            }
        </form>
    </section>
  );
}

export default Signin;






