import { useEffect, useState } from "react";
import Button from "../Button";
import LabeledInput from "../LabeledInput";
import PropTypes from "prop-types";
import { getFullAccountByAccountId } from "../../api/api";

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
       <span className="mr-2">{accountID} - {primaryDetails.primaryClient} - {"("+primaryDetails.numberOfOutstandingConditions+"/"+primaryDetails.numberOfConditions+")"}</span>
       <div className="flex justify-around gap-2">
        <Button variant={"docUpload"} />
        {/* <Button variant={"msg"} /> */}
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex flex-col w-full gap-5 items-center">
            <LabeledInput label={"Amount"} type="number" value={primaryDetails.totalAmount} />
            <LabeledInput label={"Property"} type="text" value={primaryDetails.propertyAddress} />
        </div>
        <div className="flex flex-col w-full gap-5 items-center">
            <LabeledInput label={"Closing"} type="text" value={primaryDetails.closingDate} />
            <LabeledInput label={"Product"} type="text" value={primaryDetails.product} />
        </div>
    </div>
</div>
  )
}

PrimaryDetails.propTypes = {
  accountID: PropTypes.string.isRequired,
};