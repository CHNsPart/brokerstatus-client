import { useState } from "react";
import Button from "./Button"
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function DealsSearch({ onSearch }) {
  const { t } = useTranslation();

  const initialFormData = {
    mnumber: '',
    blname: '',
    dtype: 'Application Date',
    from: '',
    to: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).every(value => value === '')) {
      // All formData values are empty, do nothing
      return;
    }
    console.log("Form Data:", formData);
    // Call the callback function to pass form data to the parent
    onSearch(formData);
  };

  const handleClear = () => {
    setFormData(initialFormData);
    // Call onSearch with null to indicate a clear search
    onSearch(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const hasData = Object.values(formData).some(value => value !== '' && value !== false);
      if (hasData) {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-2">
        <span className='labels text-xl font-semibold'>{t("dealsSearch.DealsSearch")}</span>
        <div className="rounded-md border-2 p-5">
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div className="w-full flex p-5 flex-col md:flex-row lg:flex-row justify-between items-center gap-5">
              {/* First Col */}
              <div className="w-full md:w-2/4 flex flex-col gap-2">
                <div className="w-full flex justify-between items-center gap-2">
                  <label className="labels font-semibold" htmlFor="mnumber">{t("dealsSearch.MortgageNumber")}</label>
                  <input className="lg:max-w-fit" value={formData.mnumber} onChange={handleChange} autoComplete="off" id="mnumber" type='text' />
                </div>
                <div className="w-full flex justify-between items-center gap-2">
                  <label className="labels font-semibold" htmlFor="blname">{t("dealsSearch.BorrowerName")}</label>
                  <input className="lg:max-w-fit" value={formData.blname} onChange={handleChange} autoComplete="off" id="blname" type='text' />
                </div>
              </div>
              {/* Second Col */}
              <div className="w-full md:w-2/4 flex flex-col justify-between gap-2">
                <div className="w-full flex justify-between items-center gap-2">
                  <label className="labels font-semibold" htmlFor="dtype">{t("dealsSearch.DateType")}</label>
                  <select className="px-2 py-2.5 w-2/3 rounded-md" value={formData.dtype} onChange={handleChange} id="dtype">
                    <option>{t("dealsSearch.ADate")}</option>
                    <option>{t("dealsSearch.CDate")}</option>
                  </select>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="w-full flex justify-between items-center gap-2">
                    <label className="labels font-semibold" htmlFor="from">{t("dealsSearch.From")}</label>
                    <input className="lg:max-w-fit" value={formData.from} onChange={handleChange} autoComplete="off" id="from" type='date' />
                  </div>
                  <div className="w-full flex justify-between items-center gap-2">
                    <label className="labels font-semibold" htmlFor="to">{t("dealsSearch.To")}</label>
                    <input className="lg:max-w-fit" value={formData.to} onChange={handleChange} autoComplete="off" id="to" type='date' />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-around items-center gap-2 mt-5">
              <button type="button" onClick={handleClear} className="w-full bg-zinc-500">{t("dealsSearch.btn.ClearSearch")}</button>
              <Button variant={"search"} type={"submit"} label={t("dealsSearch.btn.Search")} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

DealsSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default DealsSearch;