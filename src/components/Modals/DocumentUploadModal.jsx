import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from 'prop-types';
import { themes } from '../../lib/theme';
import { getSubdomain } from '../../lib/utils';
import { getDocumentTypes, uploadDocuments } from '../../api/api';
import useTheme from '../../hooks/useTheme';


const DocumentUploadModal = ({ isOpen, onClose, accountID }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [docType, setDocType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getDocumentTypes();
        if (apiData && apiData.attachedDocumentTypes) {
          const keyNames = apiData.attachedDocumentTypes.map(item => item.keyName);
          setDocType(keyNames);
        } else {
          console.error('Failed to fetch data for Document Types.');
        }
      } catch (error) {
        console.error('Error fetching data for Document Types:', error.message);
      }
    };
  
    fetchData();
  }, []);  

const handleFileInputChange = async (event) => {
  const files = event.target.files;
  const updatedFiles = await Promise.all(
    Array.from(files).map(async (file) => {
      const base64Data = await readFileAsBase64(file);
      return {
        fileName: file.name,
        data64: base64Data,
        accountID: accountID
      };
    })
  );

  setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
};

// Function to read file as base64
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Extract base64 string (excluding data:image/...)
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};



  const handleRemoveDocument = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  // const handleSendDocuments = async () => {
  //   if (selectedFiles.length > 0) {
  //     try {
  //       // Call the uploadDocuments function with selectedFiles
  //       const result = await uploadDocuments(selectedFiles);

  //       if (result) {
  //         console.log('Documents uploaded successfully:', result);
  //         // You can add further actions here after successful document upload
  //       } else {
  //         console.error('Failed to upload documents.');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading documents: ', error.message);
  //     }
  //   }
  // };

  const handleSendDocuments = async () => {
    if (selectedFiles.length > 0) {
      try {
        const firstDocument = selectedFiles[0];
        console.log(firstDocument);
        const resultFirst = await uploadDocuments(firstDocument);
        
        if (resultFirst) {
          console.log('First document uploaded successfully:', resultFirst);
        } else {
          console.error('Failed to upload the first document.');
        }
  
        if (selectedFiles.length > 1) {
          for (let i = 1; i < selectedFiles.length; i++) {
            const nextDocument = selectedFiles[i];
            const resultNext = await uploadDocuments([nextDocument]);
            if (resultNext) {
              console.log(`Document ${i + 1} uploaded successfully:`, resultNext);
            } else {
              console.error(`Failed to upload document ${i + 1}.`);
            }
          }
        }
      } catch (error) {
        console.error('Error uploading documents: ', error.message);
      }
    }
  };
  

  const handleSelectChange = (index, value) => {
    // const selectedValue = event.target.value;
    // setSelectedDocType(selectedValue);
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].docType = value;
    // setSelectedDocType(value)
    setSelectedFiles(updatedFiles);
    // console.log('Selected Document Type:', selectedValue);
  };

  const handleNotesChange = (index, value) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].note = value;
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

  useTheme();

  return (
    <div className={`document-upload-modal ${isOpen ? 'flex' : 'hidden'} fixed inset-0 items-center justify-center z-50`}>
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
                <span>{file.fileName.slice(0,10)}...</span>
                {/* <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  className="border p-1 rounded-lg"
                /> */}
                <select
                  id="docTypeSelect"
                  // value={selectedDocType}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  className="py-3 max-w-[220px] rounded-lg"
                >
                  <option value="">Select Document Type</option>
                  {docType.map((typeName, index) => (
                    <option key={index} value={typeName}>
                      {typeName}
                    </option>
                  ))}
                </select>

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
          <button onClick={handleSendDocuments} id='docUploadBtn' className="themeButton py-2 px-4 rounded-lg">
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
  accountID: PropTypes.string.isRequired,
};

export default DocumentUploadModal;









