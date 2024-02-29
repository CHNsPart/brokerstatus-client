import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getDocumentsByAccoundId } from "../../api/api";

function Documents({ accountID }) {
  const [accountDocuments, setAccountDocuments] = useState({});
  
  console.log(accountDocuments)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getDocumentsByAccoundId(accountID);
        if (apiData) {
          console.log(apiData);
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

  return (
    <div className="border-2 p-2 flex justify-between items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer">
      <span>1.</span>
    </div>
  );
}

Documents.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Documents;
