import Button from "../components/Button";
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full w-full flex justify-center items-center ">
        <form className="border-2 p-10 rounded-xl flex flex-col gap-2 min-w-1/2 justify-center items-start">
            <div className="w-full flex justify-between items-center">
                <label htmlFor="username" className="pr-2">{t('signin.Username')}</label>
                <input autoComplete="off" id="username" type='text' placeholder={t('signin.Username')} />
            </div>
            <div className="w-full flex justify-between items-center">
                <label htmlFor="password" className="pr-2">{t('signin.Password')}</label>
                <input autoComplete="off" id="password" type='password' placeholder={t('signin.Password')} />
            </div>
            <div className="w-full flex justify-end items-center">
                <a href="/resetpassword">
                    <p className="text-xs">{t('resetPassword.resetPassword')}</p>
                </a>
            </div>
            <div className="w-full flex justify-center items-center">
                <Button label={t('signin.signin')} />
            </div>
        </form>
    </div>
  )
}

export default Signin;
