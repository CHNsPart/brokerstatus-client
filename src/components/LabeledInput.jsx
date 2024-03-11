import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSubdomain } from '../lib/utils';
import { jwtDecode } from 'jwt-decode';
import { themes } from '../lib/theme';

function LabeledInput({ label, id, type, value, widthClass }) {
  const { t } = useTranslation();
  const [subdomain, setSubdomain] = useState(getSubdomain());

  
  useEffect(()=>{
    const token = localStorage.getItem("authToken");

    if(token) {
      const decodedToken = jwtDecode(token);
      const { TenantName } = decodedToken; 
      setSubdomain(TenantName.toLowerCase()); 
    }

    const theme = themes[subdomain] || themes.default;

    const label = document.getElementsByClassName('labels');
    if(label) {
      for (let i = 0; i < label.length; i++) {
        label[i].style.color =  theme.labelColor;
      }
    }
  },[subdomain])

  return (
    <div className={`flex flex-row w-full justify-start items-center gap-2 ${widthClass}`}>
      <span className='labels w-1/2 font-semibold'>{t(`dealView.details.${label}`)}</span>
      <input disabled name='null' className="max-w-full" id={id} type={type} value={value || '--'} />
    </div>
  );
}


LabeledInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf(['string', 'number', 'null']).isRequired,
  value: PropTypes.string,
  widthClass: PropTypes.string, // Optional width class for styling
};

export default LabeledInput;
