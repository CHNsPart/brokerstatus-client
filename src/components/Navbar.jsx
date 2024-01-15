import Button from './Button';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation();

  return (
    <div id="navigation" className={`flex justify-between px-5 py-3 z-10 w-full`}>
      <img className="h-12 w-auto" id="logo" alt="Logo" />
      <Button onClick={() => console.log('Button clicked')} label={t('navbar.buttonLabel')} />
    </div>
  );
}

export default Navbar;
