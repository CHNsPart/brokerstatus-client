import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function Button({ onClick, label, type }) {
  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
    onClick(); // Call the provided onClick function
  };

  if(type==="tile"){
    return (
      <button className="themeButton px-10 py-20" onClick={onclick}>
        {label}
      </button>
    )
  }

  if(type==="lang"){
    return (
      <button className="themeButton" onClick={handleLanguageToggle}>
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
  type: PropTypes.string
};

export default Button;
