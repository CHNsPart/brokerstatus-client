import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MdSignLanguage } from "react-icons/md";
import { useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import DocumentUploadModal from './Modals/DocumentUploadModal';
import MessageModal from './Modals/MessageModal';
import { BiMessageAdd } from 'react-icons/bi';
import useTheme from '../hooks/useTheme';

function Button({ onClick, label, variant }) {

  const { i18n } = useTranslation();

  useTheme(true);

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
      <button className="themeButton w-32 md:w-56 h-44 flex justify-center items-center overflow-hidden whitespace-normal" onClick={onClick}>
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

  if(variant==="msg"){
    return (
      <>
        <button onClick={openModal} className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 text-white">
          <BiMessageAdd/>
        </button>
        {isModalOpen && (
            <MessageModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </>
    )
  }

  if(variant==="reply"){
    return (
      <>
        <button onClick={openModal} className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 px-5 text-white">
          {label}
        </button>
        {isModalOpen && (
            <MessageModal reply={true} isOpen={isModalOpen} onClose={closeModal} />
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