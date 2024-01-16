import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MdSignLanguage } from "react-icons/md";

function Button({ onClick, label, variant }) {
  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
    onClick(); // Call the provided onClick function
  };

  if(variant==="tile"){
    return (
      <button className="themeButton px-10 py-20" onClick={onclick}>
        {label}
      </button>
    )
  }

  if(variant==="lang"){
    return (
      <button className="themeButton flex justify-center items-center gap-2" onClick={handleLanguageToggle}>
        <MdSignLanguage/>{label}
      </button>
    )
  }

  if(variant==="search"){
    return (
      <button className="themeButton w-full flex justify-center items-center gap-2" onClick={onClick}>
        {label}
      </button>
    )
  }

  return (
    <button className="themeButton" onClick={onclick}>
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string
};

export default Button;
