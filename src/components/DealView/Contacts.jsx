// Contacts.jsx
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

function Contacts({ name, role, email, mobile, work, address }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-col w-full justify-between items-start">
      <div className="border-2 p-2 flex justify-between items-center w-full md:w-2/3 rounded-lg mb-2.5">
        <span>{name} - {role}</span>
        <div className="flex justify-around gap-2">
          <Button variant={"msg"} />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-2/3 px-5 md:px-10 text-wrap">
        <div className="flex flex-col md:flex-row w-full">
          <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.E-mail")}:</span>
          <span className="w-full md:w-1/2">{email}</span>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.Mobile")}:</span>
          <span className="w-full md:w-1/2">{mobile}</span>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.Work")}:</span>
          <span className="w-full md:w-1/2">{work}</span>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <span className="w-full md:w-1/2 font-bold">{t("dealView.contacts.Address")}:</span>
          <span className="w-full md:w-1/2">{address}</span>
        </div>
      </div>
    </div>
  );
}

Contacts.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  work: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Contacts;
