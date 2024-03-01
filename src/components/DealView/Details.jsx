// import PropTypes from "prop-types";
// import LabeledInput from "../LabeledInput";
// import { useEffect, useState } from "react";
// import { getFullAccountByAccountId } from "../../api/api";
// // getAccountByAccountId
// function Details({ accountID }) {

//   const  [accountDetails, setAccountDetails] = useState([]);

//   useEffect(() => {
    
//     const fetchData = async () => {
//       try {
//         const apiData = await getFullAccountByAccountId(accountID);
//         if (apiData) {
//           setAccountDetails(apiData)
//         } else {
//           console.error('Failed to fetch data for PipelineDeals.');
//         }
//       } catch (error) {
//         console.error('Error fetching data for PipelineDeals:', error.message);
//       }
//     };

//     fetchData();
//   }, [accountID]); 

//   const splitIndex = Math.ceil(accountDetails.length / 2);
//   const f1Data = accountDetails.slice(0, splitIndex);
//   const f2Data = accountDetails.slice(splitIndex);

//   return (
//     <>
//       <div className="w-full flex flex-col gap-5">
//         {f1Data.map((item, index) => (
//           <LabeledInput key={index} {...item} />
//         ))}
//       </div>
//       <div className="w-full flex flex-col gap-5">
//         {f2Data.map((item, index) => (
//           <LabeledInput key={index + splitIndex} {...item} />
//         ))}
//       </div>
//     </>
//   );
// }

// Details.propTypes = {
//   accountID: PropTypes.string.isRequired,
// };

// export default Details;


import PropTypes from "prop-types";
import LabeledInput from "../LabeledInput";
import { useEffect, useState } from "react";
import { getFullAccountByAccountId } from "../../api/api";
import { AiOutlineLoading } from "react-icons/ai";

function Details({ accountID }) {
  const [accountDetails, setAccountDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const apiData = await getFullAccountByAccountId(accountID);
        if (apiData) {
          setAccountDetails(apiData);
          setLoading(false)
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    fetchData();
  }, [accountID]);

  // Calculate the midpoint for splitting into two columns
  const entries = Object.entries(accountDetails);
  const midpoint = Math.ceil(entries.length / 2);

  return (
    <>
    {!loading ? 
      <>
      {/* First half of the whole response data */}
        <div className="w-full flex flex-col gap-5">
          {entries.slice(0, midpoint).map(([key, value]) => (
            <LabeledInput key={key} label={key} value={value} type={typeof value === 'number' ? 'number' : 'string'} />
          ))}
        </div>

        {/* Second half of the whole response data */}
        <div className="w-full flex flex-col gap-5">
          {entries.slice(midpoint).map(([key, value]) => (
            <LabeledInput key={key} label={key} value={value} type={typeof value === 'number' ? 'number' : 'string'} />
          ))}
        </div>
      </>
      :
      <div className='w-full h-full flex justify-center p-10'>
        <AiOutlineLoading className='animate-spin size-10'/>
      </div>
    }
    </>
  );
}

Details.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Details;
