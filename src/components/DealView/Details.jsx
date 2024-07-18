import PropTypes from "prop-types";
import LabeledInput from "../LabeledInput";
import { useEffect, useState } from "react";
import { getFullAccountByAccountId } from "../../api/api";
import { AiOutlineLoading } from "react-icons/ai";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { formatter } from "../../lib/utils";
// import { jwtDecode } from "jwt-decode";
// import { themes } from '../../lib/theme';
import useTheme from "../../hooks/useTheme";

dayjs.locale('en'); 
function Details({ accountID, activeTab }) {
  const [accountDetails, setAccountDetails] = useState({});
  const [loading, setLoading] = useState(false);
  // const [subdomain, setSubdomain] = useState(getSubdomain());

  useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const apiData = await getFullAccountByAccountId(accountID);
        if (apiData) {
          // eslint-disable-next-line no-unused-vars
          const { accountID, applicationID, subStatus, ...cleanedApiData } = apiData;
          setAccountDetails(cleanedApiData);
          setLoading(false)

          // const token = localStorage.getItem("authToken");

          // if(token) {
          //   const decodedToken = jwtDecode(token);
          //   const { TenantName } = decodedToken; 
          //   setSubdomain(TenantName.toLowerCase()); 
          // }

          // const theme = themes[subdomain] || themes.default;

          // const label = document.getElementsByClassName('labels');
          // if(label) {
          //   for (let i = 0; i < label.length; i++) {
          //     label[i].style.color =  theme.labelColor;
          //   }
          // }

        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    if (activeTab === "Details" || activeTab === "Détails") {
      fetchData();
    }

    fetchData();
  }, [accountID, activeTab]);

  useTheme()

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
            <LabeledInput key={key} label={key} 
              value=
              {
                (key === "applicationDate" || key === "closingDate") 
                ? 
                  dayjs(value).format('YYYY-MM-DD') 
                : 
                  (key === "totalAmount") 
                  ? 
                    formatter.format(value)
                  :
                    value
              } 
              type={'string'} />
          ))}
        </div>

        {/* Second half of the whole response data */}
        <div className="w-full flex flex-col gap-5">
          {entries.slice(midpoint).map(([key, value]) => (
            <LabeledInput key={key} label={key} 
              value=
              {
                (key === "firstPymtDate") 
                ? 
                  dayjs(value).format('YYYY-MM-DD') 
                : 
                  (key === "totalDownPaymentAmt" || key === "totalPurchasePrice" || key === "pymtAmount") 
                  ? 
                    formatter.format(value)
                  :
                    value
              } 
              type={'string'} />
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
  activeTab: PropTypes.string.isRequired,
};

export default Details;







