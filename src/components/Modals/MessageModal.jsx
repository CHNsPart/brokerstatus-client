import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { IoIosCloseCircle } from "react-icons/io";
import { getSubdomain, themes } from "../../lib/theme";

export default function MessageModal({ isOpen, onClose, reply }) {
    const [message, setMessage] = useState({
        title: "",
        body: ""
    });

    const handleTitle = (event) => {
        setMessage({ ...message, title: event.target.value });     
    };

    const handleBody = (event) => {
        setMessage({ ...message, body: event.target.value });
    };

    const handleSendDocuments = () => {
        console.log(message)
        // onClose();
    };

    useEffect(() => {
    // Detect subdomain
    const subdomain = getSubdomain();
    // Get the theme based on subdomain or use the default theme
    const theme = themes[subdomain] || themes.default;
    const button = document.getElementById("msgUploadBtn");

    button.style.backgroundColor = theme.primaryButtonBgColor;
    button.style.color = theme.primaryButtonTextColor;
    }, []);


  return (
    <div className={`document-upload-modal ${isOpen ? 'flex' : 'hidden'} fixed inset-0 items-center justify-center`}>
      <div className="modal-backdrop absolute bg-black/50 inset-0" onClick={onClose}></div>

      <div className="modal-content rounded-lg absolute max-w-fit p-10 min-w-fit md:min-w-[26rem] overflow-auto bg-white z-50">
        <div className="modal-header flex justify-between items-center">
          <h2 className='text-zinc-500'>Type Your Message</h2>
          <button className='text-red-500 bg-transparent border-none hover:text-red-600 p-0' onClick={onClose}><IoIosCloseCircle size={30}/></button>
        </div>

        {/* Input Section */}
        <div className='my-4 flex flex-col items-start gap-2'>
            <label htmlFor="" className='mr-6 text-sm font-medium text-zinc-500'>Title</label>
            <input type="text" onChange={handleTitle} className="min-w-full z-50" />
        </div>
        <div className='my-4 flex flex-col items-start gap-2'>
            <label htmlFor="" className='mr-6 text-sm font-medium text-zinc-500'>Body</label>
            <textarea type="text" onChange={handleBody} className="min-w-full min-h-28 z-50" />
        </div>

        {/* Buttons Section */}
        <div className="buttons-section w-full flex justify-center items-center mt-5 gap-4">
          <button onClick={handleSendDocuments} id='msgUploadBtn' className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full">
           { reply ? "Reply" : "Send" }
          </button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg w-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

MessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reply: PropTypes.bool
};
