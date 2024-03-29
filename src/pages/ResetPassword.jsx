import { useState } from "react";
import Button from "../components/Button";
import { useTranslation } from 'react-i18next';
import { resetPassword } from "../api/api";
import Loading from "../components/Loading"

const ResetPassword = () => {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState({
    username: "",
  });
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleResetAuth = async (e) => {
    e.preventDefault();
    const username = credentials.username;
    try {
      if(username) {
        setLoading(true)
        setErr("")
        const data = await resetPassword(username);
        if (data === true) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 2000); 
        }
        if (typeof data === 'string') {setErr(data)}
        console.log("reset data", data)
        setLoading(false)
      } else {
        return;
      }
    } catch (error) {
      setLoading(false)
    }
    setLoading(false)
    console.log(credentials)
  }



  return (
    <section className="h-full w-full flex justify-center items-center p-5">
        <form className="border-2 p-5 rounded-xl flex flex-col gap-2 min-w-1/2 justify-center bg-zinc-100 items-start">
            <div className="w-full flex justify-around items-center">
                <label htmlFor="username" className="pr-2">{t('signin.Username')}</label>
                <input onChange={handleChange} autoComplete="off" id="username" type='text' placeholder={t('signin.Username')} />
            </div>
            <div className="w-full flex justify-end items-center">
                <a href="/">
                    <p className="text-xs">{t('signin.signin')}</p>
                </a>
            </div>
            <div className="w-full flex justify-center items-center">
              {!loading ? 
                <Button onClick={handleResetAuth} disabled label={t('resetPassword.resetPassword')} />
                :
                <Loading/>
              }
            </div>
        { err && <span className="w-full text-center text-red-500 mt-2">{err}</span>}    
        { success && <span className="w-full text-center text-green-600 mt-2">Changed Successfully! Please wait...</span>}    
        </form>
    </section>
  );
}

export default ResetPassword;
