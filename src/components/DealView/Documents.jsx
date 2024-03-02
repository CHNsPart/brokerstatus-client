import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getDocumentData, getDocumentsByAccoundId } from "../../api/api";

function Documents({ accountID }) {
  const [accountDocuments, setAccountDocuments] = useState({});

  console.log(accountDocuments);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getDocumentsByAccoundId(accountID);
        if (apiData) {
          // console.log(apiData);
          setAccountDocuments(apiData);
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
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
      <span className="font-semibold text-black">Uploaded Documents</span>
      {/* attachedDocuments loop */}
      {accountDocuments.attachedDocuments &&
        accountDocuments.attachedDocuments.map((document, index) => (
          <div
            key={index}
            onClick={() => handleDocumentClick(document)}
            className="border-2 p-2 flex justify-between items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            {document.fileName}
          </div>
        ))}
      <span className="font-semibold text-black">System Generated Documents</span>
      {/* mergedDocuments loop */}
      {accountDocuments.mergedDocuments &&
        accountDocuments.mergedDocuments.map((document, index) => (
          <div
            key={index}
            onClick={() => handleDocumentClick(document)}
            className="border-2 p-2 flex justify-between items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            {document.fileName}
          </div>
        ))}
    </>
  );
}

Documents.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Documents;
