import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MdSignLanguage } from "react-icons/md";
import { useEffect, useState } from 'react';
import {themes, getSubdomain} from '../lib/theme';
import { HiOutlineUpload } from 'react-icons/hi';
import DocumentUploadModal from './Modals/DocumentUploadModal';

function Button({ onClick, label, variant }) {

  const { i18n } = useTranslation();

  useEffect(() => {
    // Detect subdomain
    const subdomain = getSubdomain();
    // Get the theme based on subdomain or use the default theme
    const theme = themes[subdomain] || themes.default;
    const themeButton = document.getElementsByClassName("themeButton");
    for (let i = 0; i < themeButton.length; i++) {
        themeButton[i].style.backgroundColor = theme.primaryButtonBgColor;
        themeButton[i].style.color = theme.primaryButtonTextColor;
    }
  }, []);

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if(variant==="tile"){
    return (
      <button className="themeButton px-10 py-20" onClick={onClick}>
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

  if(variant==="docUpload"){
    return (
      <>
        <button onClick={openModal} className="rounded-full bg-green-500 hover:bg-green-700 p-2 text-white">
          <HiOutlineUpload />
        </button>
        {isModalOpen && (
            <DocumentUploadModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </>
    )
  }

  if(variant==="tabs"){
    return (
      <button className={`${label} tabs w-full text-black bg-transparent flex justify-center items-center gap-2`} onClick={onClick}>
        {label}
      </button>
    )
  }
  

  return (
    <button className="themeButton" onClick={onClick}>
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  variant: PropTypes.string
};

export default Button;