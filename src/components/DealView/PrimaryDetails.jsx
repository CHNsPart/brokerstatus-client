import { useEffect, useState } from "react";
import Button from "../Button";
import LabeledInput from "../LabeledInput";
import PropTypes from "prop-types";
import { Tooltip } from 'react-tooltip'
import { getFullAccountByAccountId } from "../../api/api";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { formatter } from "../../lib/utils";

dayjs.locale('en'); 
export default function PrimaryDetails({ accountID }) {
  
  const [primaryDetails, setPrimaryDetails] = useState([]);
  // const [formattedString, setFormattedString] = useState("");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const apiData = await getFullAccountByAccountId(accountID);
        if (apiData) {
          // console.log(apiData)
          // if(primaryDetails !== undefined) {
          //   setFormattedString(apiData.listMortgagors.replace('\r\n', ', '));
          // }
          setPrimaryDetails(apiData)
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    fetchData();
  }, [accountID, primaryDetails]); 

  // const formatString = (str) => {
  //   const newStr = str.replace('\r\n', ', ');
  //   return newStr;
  // }

  return (
    <div className="border-2 p-5">
      <div className="border-2 p-2 flex justify-between items-center rounded-lg mb-5">
        <span className="labels font-semibold mr-2">{accountID} - {primaryDetails.primaryClient} - {"( Outstanding Conditions "}{+primaryDetails.numberOfOutstandingConditions>0 ? <span className="text-red-500">{primaryDetails.numberOfOutstandingConditions}</span> : primaryDetails.numberOfOutstandingConditions}{`/${primaryDetails.numberOfConditions} )`}</span>
        
        <div className="flex justify-around gap-2" data-tooltip-content="Document Upload Button" data-tooltip-id="uploadTooltip">
          <Button accountID={accountID} variant={"docUpload"} />
          {/* <Button variant={"msg"} /> */}
        </div>
        <Tooltip id="uploadTooltip" place="bottom" effect="solid" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex flex-col w-full gap-5 items-center">
              <LabeledInput label={"Amount"} type="string" value={formatter.format(primaryDetails.totalAmount)} />
              <LabeledInput label={"Property"} type="string" value={primaryDetails.propertyAddress} />
          </div>
          <div className="flex flex-col w-full gap-5 items-center">
              <LabeledInput label={"Closing"} type="string" value={dayjs(primaryDetails.closingDate).format('YYYY-MM-DD')} />
              <LabeledInput label={"Product"} type="string" value={primaryDetails.product} />
          </div>
      </div>
    </div>
  )
}

PrimaryDetails.propTypes = {
  accountID: PropTypes.string.isRequired,
};
