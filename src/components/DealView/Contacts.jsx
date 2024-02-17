// Contacts.jsx
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { getInternalLoanContactsByAccoundId } from '../../api/api';

function Contacts({ accountID }) {
  
  const { t } = useTranslation();
  const  [accountContacts, setAccountContacts] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const apiData = await getInternalLoanContactsByAccoundId(accountID);
        if (apiData) {
          console.log(apiData)
          setAccountContacts(apiData)
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
    <div className="flex flex-col md:flex-col w-full justify-between items-start">
      { accountContacts.map((contact, index) => (
        <div className="p-2 w-full rounded-lg mb-2.5" key={index}>
          <div className="border-2 p-2 flex justify-between items-center w-full md:w-2/3 rounded-lg mb-2.5">
            <span>{contact.fullName} - {contact.team}</span>
            <div className="flex justify-around gap-2">
              <Button variant={"msg"} />
            </div>
          </div>
          <div className="flex flex-col w-full mb-2 md:w-2/3 px-5 md:px-10 text-wrap">
            <div className="flex flex-col md:flex-row w-full">
              <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.E-mail")}:</span>
              <span className="w-full md:w-1/2">{contact.email ?? "--"}</span>
            </div>
            <div className="flex flex-col md:flex-row w-full">
              <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.Mobile")}:</span>
              <span className="w-full md:w-1/2">{contact.phoneNumber ?? "--"}</span>
            </div>
            <div className="flex flex-col md:flex-row w-full">
              <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.Work")}:</span>
              <span className="w-full md:w-1/2">{contact.work ?? "--"}</span>
            </div>
            <div className="flex flex-col md:flex-row w-full">
              <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.Address")}:</span>
              <span className="w-full md:w-1/2">{contact.address ?? "--"}</span>
            </div>
          </div>
        </div>
      )) }
    </div>
  );
}

Contacts.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Contacts;
