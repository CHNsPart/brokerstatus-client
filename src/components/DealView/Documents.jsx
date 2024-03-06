import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getDocumentData, getDocumentsByAccoundId } from "../../api/api";
import Loading from "../Loading";

function Documents({ accountID }) {
  const [accountDocuments, setAccountDocuments] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(accountDocuments);
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
    if(document.id){
      try {
        const result = await getDocumentData(accountID, document.id);

        if (result) {
          console.log('Documents uploaded successfully:', result);
        } else {
          console.error('Failed to upload documents.');
        }

      } catch (error) {
        console.error('Error uploading documents: ', error.message);
      }
    }
    // Perform any other action you need with the document ID
  };

  return (
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
            ))}
          {/* mergedDocuments loop */}
          {accountDocuments.mergedDocuments &&
            accountDocuments.mergedDocuments.map((document, index) => (
              <div
                key={index}
                onClick={() => handleDocumentClick(document)}
                className="border-2 p-2 flex items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                <span className="w-1/3 text-left">{document.fileName}</span>
                <span className="w-1/3 text-center">System Generated Documents</span>
                <span className="w-1/3 text-right">{document.created}</span>
              </div>
            ))}
          </>
          :
          <Loading/>
      }
    </>
  );
}

Documents.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Documents;
