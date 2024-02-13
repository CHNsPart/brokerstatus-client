import PropTypes from "prop-types";
import LabeledInput from "../LabeledInput";
import { useEffect, useState } from "react";
import { getAccountByAccountId } from "../../api/api";
function Details({ accountID }) {

  const  [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const apiData = await getAccountByAccountId(accountID);
        if (apiData) {
          setAccountDetails(apiData)
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    fetchData();
  }, [accountID]); 

  const splitIndex = Math.ceil(accountDetails.length / 2);
  const f1Data = accountDetails.slice(0, splitIndex);
  const f2Data = accountDetails.slice(splitIndex);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {f1Data.map((item, index) => (
          <LabeledInput key={index} {...item} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-5">
        {f2Data.map((item, index) => (
          <LabeledInput key={index + splitIndex} {...item} />
        ))}
      </div>
    </>
  );
}

Details.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Details;









