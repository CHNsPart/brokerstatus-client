import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function Button({ onClick, label }) {
  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
    onClick(); // Call the provided onClick function
  };

  return (
    <button className="themeButton" onClick={handleLanguageToggle}>
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Button;
