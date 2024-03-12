import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getDocumentData, getDocumentsByAccoundId } from "../../api/api";
import Loading from "../Loading";
import { BiError } from "react-icons/bi";
function Documents({ accountID }) {
  const [accountDocuments, setAccountDocuments] = useState({});
  const [loading, setLoading] = useState(false);

  function isEmptyObject(obj) {
    return obj && obj.attachedDocuments && obj.attachedDocuments.length === 0 &&
           obj.mergedDocuments && obj.mergedDocuments.length === 0;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const apiData = await getDocumentsByAccoundId(accountID);
        if (apiData) {
          console.log(apiData);
          setAccountDocuments(apiData);
          setLoading(false)
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
        setLoading(false)
      }
    };

    fetchData();
  }, [accountID]);


  const handleDocumentClick = async (document) => {
    console.log('Document ID:', document.id);
    if (document.id) {

      try {
        const result = await getDocumentData(accountID, document.id);
        // cursor mode loading
        if (result) {
          // Convert the base64 encoded PDF content to a Blob
          const byteCharacters = atob(result.file);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
  
          // Create a download link for the Blob
          const url = URL.createObjectURL(blob);
          const a = window.document.createElement('a');
          a.href = url;
          a.download = `${result.name}.${result.extension}`;
          a.click();
          // cursor mode normal
        } else {
          console.error('Failed to download document.');
        }
      } catch (error) {
        console.error('Error downloading document: ', error.message);
      }
    }
  };
  
  

  return (
    <>
      {!isEmptyObject(accountDocuments) 
      ? 
      <>
      {!loading ?  
        <>
          {/* attachedDocuments loop */}
          {accountDocuments.attachedDocuments &&
            accountDocuments.attachedDocuments.map((document, index) => (
              <div
                key={index}
                onClick={() => handleDocumentClick(document)}
                className="border-2 p-2 flex items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                <span className="w-1/3 text-left">{document.fileName}</span>
                <span className="w-1/3 text-center">Broker Uploaded Documents</span>
                <span className="w-1/3 text-right">{document.createdDate}</span>
              </div>
            ))
            
          }
          {/* mergedDocuments loop */}
          {accountDocuments.mergedDocuments &&
            accountDocuments.mergedDocuments.map((document, index) => (
              <div
                key={index}
                onClick={() => handleDocumentClick(document)}
                className="border-2 p-2 flex items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                <span className="w-1/3 text-left">{document.fileName}{document.fileExtention}</span>
                <span className="w-1/3 text-center">System Generated Documents</span>
                <span className="w-1/3 text-right">{document.created}</span>
              </div>
            ))}
          </>
          :
          <Loading/>
      }
      </>
      :
      <div className="w-full text-center p-5 italic text-zinc-500">
        <BiError size={50} className="text-red-500 text-center w-full mb-2 animate-bounce" />No data found.<br/>Please try again later.
      </div>
    }
    </>
  );
}

Documents.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Documents;





