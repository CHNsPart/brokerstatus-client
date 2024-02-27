import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function LabeledInput({ label, id, type, value, widthClass }) {
  const { t } = useTranslation();
  return (
    <div className={`flex flex-row w-full justify-start items-center gap-2 ${widthClass}`}>
      <span className='w-1/2'>{t(`dealView.details.${label}`)}</span>
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
