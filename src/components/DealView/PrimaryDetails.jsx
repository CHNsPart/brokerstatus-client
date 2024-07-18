import { useEffect, useState } from "react";
import Button from "../Button";
import LabeledInput from "../LabeledInput";
import PropTypes from "prop-types";
import { Tooltip } from 'react-tooltip';
import { getFullAccountByAccountId } from "../../api/api";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { formatter } from "../../lib/utils";

dayjs.locale('en'); 

function PrimaryDetails({ accountID, handleModalClose }) {
  const [primaryDetails, setPrimaryDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getFullAccountByAccountId(accountID);
        if (apiData) {
          setPrimaryDetails(apiData);
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    // Fetch data initially
    fetchData();

    // Refresh data every 2 minutes
    const intervalId = setInterval(fetchData, 2 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [accountID]); // Only re-run effect if accountID changes

  return (
    <div className="border-2 p-5">
      <div className="border-2 p-2 flex justify-between items-center rounded-lg mb-5">
        <span className="labels font-semibold mr-2">
          {accountID} - {primaryDetails.primaryClient} - 
          {primaryDetails.numberOfOutstandingConditions > 0 ? (
            <span className="text-red-500">
              {" (Outstanding Conditions " + primaryDetails.numberOfOutstandingConditions + "/" + primaryDetails.numberOfConditions + ")"}
            </span>
          ) : (
            <span>{" (Outstanding Conditions " + primaryDetails.numberOfOutstandingConditions + "/" + primaryDetails.numberOfConditions + ")"}</span>
          )}
        </span>
        
        <div className="flex justify-around gap-2" data-tooltip-content="Document Upload Button" data-tooltip-id="uploadTooltip">
          <Button accountID={accountID} variant={"docUpload"} handleModalClose={handleModalClose} />
        </div>
        <Tooltip id="uploadTooltip" place="bottom" effect="solid" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-5">
        <div className="flex flex-col w-full gap-5 items-center">
          <LabeledInput label={"Amount"} type="string" value={formatter.format(primaryDetails.totalAmount)} />
          <LabeledInput label={"Property"} type="string" value={primaryDetails.propertyAddress} />
        </div>

        <div className="flex flex-col w-full gap-5 items-center">
          <LabeledInput label={"Closing"} type="string" value={dayjs(primaryDetails.closingDate).format('YYYY-MM-DD')} />
          <LabeledInput label={"Product"} type="string" value={primaryDetails.product} />
        </div>

        <div className="flex flex-col w-full gap-5 items-center">
          <LabeledInput label={"Interest"} type="string" value={primaryDetails.interestRate} />
        </div>
      </div>
    </div>
  );
}

PrimaryDetails.propTypes = {
  accountID: PropTypes.string.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default PrimaryDetails;
