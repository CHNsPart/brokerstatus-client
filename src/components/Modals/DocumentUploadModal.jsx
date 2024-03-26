import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from 'prop-types';
import { themes } from '../../lib/theme';
import { getSubdomain } from '../../lib/utils';
import { CgSpinner } from "react-icons/cg";
import { getDocumentTypes, uploadDocuments } from '../../api/api';
import useTheme from '../../hooks/useTheme';
import { BiSolidBadgeCheck, BiSolidError } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';


const DocumentUploadModal = ({ isOpen, onClose, accountID }) => {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [docType, setDocType] = useState([]);
  const [uplaoding, setUplaoding] = useState(false);
  const [success, setSuccess] = useState({
    yes: false,
    no: false,
    neutral: false
  });
  const [currentTenant, setCurrentTenant] = useState('');

  useEffect(() => {
    setCurrentTenant(localStorage.getItem("tenantName"))
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


const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]);
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

  //   if (selectedFiles.length > 0) {
  //     try {
  //       setUplaoding(true)
  //       setSuccess(({
  //         neutral: true,
  //         yes: false,
  //         no: false
  //       }));   
  //       const firstDocument = selectedFiles[0];
  //       // console.log(firstDocument);
  //       const resultFirst = await uploadDocuments(firstDocument);

  //       if (resultFirst) {
  //         console.log('First document uploaded successfully:', resultFirst);
  //         setSuccess(({
  //           neutral: false,
  //           yes: true,
  //           no: false
  //         }));            
  //       } else {
  //         console.error('Failed to upload the first document.');
  //         setSuccess(({
  //           neutral: false,
  //           yes: false,
  //           no: true
  //         }));  
  //       }
  
  //       if (selectedFiles.length > 1) {
  //         for (let i = 1; i < selectedFiles.length; i++) {
  //           const nextDocument = selectedFiles[i];
  //           const resultNext = await uploadDocuments(nextDocument);
  //           if (resultNext) {
  //             console.log(`Document ${i + 1} uploaded successfully:`, resultNext);
  //             setSuccess(({
  //               neutral: false,
  //               yes: true,
  //               no: false
  //             }));  
  //           } else {
  //             console.error(`Failed to upload document ${i + 1}.`);
  //             setSuccess(({
  //               neutral: false,
  //               yes: false,
  //               no: true
  //             })); 
  //           }
  //         }
  //       } 
  //       // setUplaoding(false)
  //     } catch (error) {
  //       console.error('Error uploading documents: ', error.message);
  //       setSuccess(({
  //         neutral: false,
  //         yes: false,
  //         no: true
  //       })); 
  //     }
  //     setUplaoding(false)
  //     setSuccess(({
  //       neutral: true,
  //       yes: false,
  //       no: false
  //     })); 
  //   }
  // };

  const handleSendDocuments = async () => {
    if (selectedFiles.length > 0) {
      try {
        setUplaoding(true);
        for (let i = 0; i < selectedFiles.length; i++) {
          const document = selectedFiles[i];
          setSuccess(prevSuccess => ({
            ...prevSuccess,
            [i]: { neutral: true, yes: false, no: false } // Initialize upload status for each document
          }));
          const result = await uploadDocuments(document);
          if (result) {
            console.log(`Document ${i + 1} uploaded successfully:`, result);
            setSuccess(prevSuccess => ({
              ...prevSuccess,
              [i]: { neutral: false, yes: true, no: false } // Set success status for current document
            }));
          } else {
            console.error(`Failed to upload document ${i + 1}.`);
            setSuccess(prevSuccess => ({
              ...prevSuccess,
              [i]: { neutral: false, yes: false, no: true } // Set failure status for current document
            }));
          }
        }
      } catch (error) {
        console.error('Error uploading documents: ', error.message);
      }
      // setTimeout(() => {
      //   setUplaoding(false);
      //   // onClose();
      // }, 3000);
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


  const handleUploadState = () => {
    setUplaoding(false)
    setSuccess(
      { neutral: true, yes: false, no: false } // Initialize upload status for each document
    );
  }
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
          <h2 className='text-zinc-500'>{t('uploadDocs.title')}</h2>
          <button className='text-red-500 bg-transparent border-none hover:text-red-600 p-0' onClick={onClose}><IoIosCloseCircle size={30}/></button>
        </div>

        {/* Input Section */}
        <span className='border-2 border-black rounded-lg relative my-4 flex items-center'>
            <span className='absolute text-center text-black w-full  z-40'>{t('uploadDocs.input')}</span>
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
            {t('uploadDocs.dragone')}<br /> or <br />{t('uploadDocs.dragtwo')}
        </span>
          {/* Drop-down Section */}
          <select multiple onChange={handleFileInputChange} className="overflow-hidden mb-4">
           
          </select>
        </div>

        {/* Display Selected Documents */}
        {/* {((selectedFiles.length > 0 ) && !uplaoding) && (
          <div className="selected-documents max-h-52 overflow-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="document-info flex items-center border p-2 rounded-lg justify-between gap-2 mb-2">
                <span>{file.fileName.slice(0,10)}...</span>
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
        )} */}

        {/* Display Selected Documents */}
        {((selectedFiles.length > 0) && !uplaoding) && (
          <div className="selected-documents max-h-52 overflow-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="document-info flex items-center border p-2 rounded-lg justify-between gap-2 mb-2">
                <span>{file.fileName.slice(0,10)}...</span>
                <select
                  id="docTypeSelect"
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  className="py-3 max-w-[220px] rounded-lg"
                >
                  <option value="">{t('uploadDocs.docTypes')}</option>
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
                  {t('uploadDocs.remove')}
                </button>
              </div>
            ))}
          </div>
        )}


        {((selectedFiles.length > 0) && uplaoding) && (
          <div className="selected-documents max-h-52 overflow-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="document-info flex items-center border p-2 rounded-lg justify-between gap-2 mb-2 transition-all ease-linear">
                <span>{file.fileName.slice(0,10)}...</span>
                {success[index] && (
                  <>
                    {success[index].yes && <span className="flex items-center gap-2 text-green-500">{t('uploadDocs.success')}<BiSolidBadgeCheck /></span>}
                    {success[index].no && <span className="flex items-center gap-2 text-red-500">{t('uploadDocs.failed')}<BiSolidError /></span>}
                    {success[index].neutral && <span className="flex items-center gap-2 text-gray-500">{t('uploadDocs.uploading')}<CgSpinner className="animate-spin" /></span>}
                  </>
                )}
              </div>
            ))}
          </div>
        )}


        {/* Buttons Section */}
        <div className="buttons-section w-full flex flex-col md:flex-row justify-center items-center mt-5 gap-4">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
            {!uplaoding ? t('uploadDocs.cancel') : t('uploadDocs.close')}
          </button>
          <button onClick={!uplaoding ? handleSendDocuments : handleUploadState} id='docUploadBtn' className="themeButton py-2 px-4 rounded-lg">
            {!uplaoding ? `${t('uploadDocs.btn')} ${currentTenant.toUpperCase()}` : (success.no ? t('uploadDocs.try') : t('uploadDocs.new'))}
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














