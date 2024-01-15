import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function Dropdown({ label, options }) {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{t(label)}</label>
      <select className="mt-1 p-2 border border-gray-300 rounded-md">
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>{t(value)}</option>
        ))}
      </select>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
};

export default Dropdown;
