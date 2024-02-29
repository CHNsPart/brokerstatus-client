import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from 'prop-types';
import { themes } from '../../lib/theme';
import { getSubdomain } from '../../lib/utils';


const DocumentUploadModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveDocument = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleSendDocuments = () => {
    console.log(selectedFiles)
    // onClose();
  };

  const handleSubjectChange = (index, value) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].subject = value;
    setSelectedFiles(updatedFiles);
  };

  const handleNotesChange = (index, value) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].notes = value;
    setSelectedFiles(updatedFiles);
  };

  useEffect(() => {
    // Detect subdomain
    const subdomain = getSubdomain();
    // Get the theme based on subdomain or use the default theme
    const theme = themes[subdomain] || themes.default;
    const button = document.getElementById("docUploadBtn");

    button.style.backgroundColor = theme.primaryButtonBgColor;
    button.style.color = theme.primaryButtonTextColor;
  }, []);

  return (
    <div className={`document-upload-modal ${isOpen ? 'flex' : 'hidden'} fixed inset-0 items-center justify-center`}>
      <div className="modal-backdrop absolute bg-black/50 inset-0" onClick={onClose}></div>

      <div className="modal-content rounded-lg absolute max-w-[18rem] md:min-w-fit p-10 overflow-auto bg-white z-50">
        <div className="modal-header flex justify-between items-center">
          <h2 className='text-zinc-500'>Attach Document to Account</h2>
          <button className='text-red-500 bg-transparent border-none hover:text-red-600 p-0' onClick={onClose}><IoIosCloseCircle size={30}/></button>
        </div>

        {/* Input Section */}
        <span className='border-2 border-black rounded-lg relative my-4 flex items-center'>
            <span className='absolute text-center text-black w-full  z-40'>Attach Document to Account</span>
            <input type="file" multiple onChange={handleFileInputChange} className="min-w-full z-50 opacity-0" />
        </span>


        {/* Drop-down Section */}
        <div
          className="border flex items-center border-dashed border-zinc-500 rounded-lg p-4 mb-4"
          onDrop={(e) => {
            e.preventDefault();
            handleFileInputChange({ target: { files: e.dataTransfer.files } });
          }}
          onDragOver={(e) => e.preventDefault()}
        >
        <span className='w-full text-center text-zinc-500'>
            Drop files here <br /> or <br /> Select Files
        </span>
          {/* Drop-down Section */}
          <select multiple onChange={handleFileInputChange} className="overflow-hidden mb-4">
           
          </select>
        </div>

        {/* Display Selected Documents */}
        {selectedFiles.length > 0 && (
          <div className="selected-documents max-h-52 overflow-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="document-info flex items-center border p-2 rounded-lg justify-between gap-2 mb-2">
                <span>{file.name.slice(0,10)}...</span>
                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  className="border p-1 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Note"
                  onChange={(e) => handleNotesChange(index, e.target.value)}
                  className="border p-1 rounded-lg"
                />
                <button onClick={() => handleRemoveDocument(index)} className="themeButton bg-red-500 text-white p-1 rounded-lg">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Buttons Section */}
        <div className="buttons-section w-full flex flex-col md:flex-row justify-center items-center mt-5 gap-4">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
            Cancel/Clear
          </button>
          <button onClick={handleSendDocuments} id='docUploadBtn' className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
            Send Document to CMLS
          </button>
        </div>
      </div>
    </div>
  );
};

DocumentUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DocumentUploadModal;
