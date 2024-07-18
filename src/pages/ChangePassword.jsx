import { useState } from "react";
import Button from "../components/Button";
import { useTranslation } from 'react-i18next';
import { changePassword } from "../api/api";
import Loading from "../components/Loading";

const ChangePassword = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState(false)

  const [credentials, setCredentials] = useState({
    username: "",
    currentPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleResetAuth = async (e) => {
    e.preventDefault();
    const formData = {
        username: credentials.username,
        currentPassword: credentials.currentPassword,
        newPassword: credentials.newPassword
    };
    try {
    setLoading(true)
      if(formData.username && formData.currentPassword && formData.newPassword) {
        setErr("")
        const data = await changePassword(formData);
        if (data === true) {
            setSuccess(true);
            console.log("Successfully changed password");
            setTimeout(() => {
              window.location.href = "/home";
            }, 2000);            
        }
        if (typeof data === 'string') {setErr(data)}
        console.log("change data", data)
        setLoading(false)
      } else {
        setLoading(false)
        return;
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setLoading(false)
    console.log(formData)
  }

  return (
    <section className="h-full w-full flex justify-center items-center p-5">
        <form className="border-2 p-5 rounded-xl flex flex-col gap-2 min-w-1/2 justify-center bg-zinc-100 items-start">
            <div className="w-full flex justify-between items-center">
                <label htmlFor="username" className="pr-2">{t('signin.Username')}</label>
                <input onChange={handleChange} autoComplete="off" id="username" type='text' placeholder={t('signin.Username')} />
            </div>
            <div className="w-full flex justify-between items-center">
                <label htmlFor="currentPassword" className="pr-2">{t('signin.CurrentPassword')}</label>
                <input onChange={handleChange} autoComplete="off" id="currentPassword" type='password' placeholder={t('signin.CurrentPassword')} />
            </div>
            <div className="w-full flex justify-between items-center">
                <label htmlFor="newPassword" className="pr-2">{t('signin.NewPassword')}</label>
                <input onChange={handleChange} autoComplete="off" id="newPassword" type='password' placeholder={t('signin.NewPassword')} />
            </div>
            {/* <div className="w-full flex justify-end items-center">
                <a href="/">
                    <p className="text-xs">{t('signin.signin')}</p>
                </a>
            </div> */}
            <div className="w-full flex justify-center items-center mt-2">
            {!loading ? 
                <Button onClick={handleResetAuth} label={t('resetPassword.resetPassword')} />
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

export default ChangePassword;
