import PropTypes from 'prop-types';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { getConditionTrackingByAccoundId } from '../../api/api';

function Conditions({ accountID }) {
  
  const  [accountConditions, setAccountConditions] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const apiData = await getConditionTrackingByAccoundId(accountID);
        if (apiData) {
          // Handle fetched data
          console.log(apiData)
          setAccountConditions(apiData)
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
    <>
      {accountConditions.map((condition, index) => (
        <div key={index} className="border-2 p-2 flex justify-between items-center w-full md:w-2/3 rounded-lg gap-2">
          <div>
            <span>{index + 1}.</span>
            {" "}
            <span>{condition.clause}</span>
          </div>
          <div className="flex justify-around gap-2">
            <Button variant={"docUpload"} />
          </div>
        </div>
      ))}
    </>
  );
}

Conditions.propTypes = {
  accountID: PropTypes.string.isRequired
};


export default Conditions;
