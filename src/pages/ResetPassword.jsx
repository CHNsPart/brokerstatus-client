import Button from "../components/Button";
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <section className="h-full w-full flex justify-center items-center p-5">
        <form className="border-2 p-5 rounded-xl flex flex-col gap-2 min-w-1/2 justify-center items-start">
            <div className="w-full flex justify-around items-center">
                <label htmlFor="username" className="pr-2">{t('signin.Username')}</label>
                <input autoComplete="off" id="username" type='text' placeholder={t('signin.Username')} />
            </div>
            <div className="w-full flex justify-end items-center">
                <a href="/">
                    <p className="text-xs">{t('signin.signin')}</p>
                </a>
            </div>
            <div className="w-full flex justify-center items-center">
                <Button label={t('resetPassword.resetPassword')} />
            </div>
        </form>
    </section>
  );
}

export default ResetPassword;
