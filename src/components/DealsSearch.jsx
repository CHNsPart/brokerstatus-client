import { useState } from "react";
import Button from "./Button"
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function DealsSearch({ onSearch }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    // bdm: '',
    mnumber: '',
    blname: '',
    // agent: '',
    dtype: 'Application Date',
    from: '',
    to: '',
    // selectAll: false,
    // appReceived: false,
    // inUnderwriting: false,
    // readyToFund: false,
  });


  const handleChange = (e) => {
      const { id, type, checked, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [id]: type === 'checkbox' ? checked : value,
      }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Call the callback function to pass form data to the parent
    onSearch(formData);
  };

  const handleClear = () => {
    setFormData({
        // bdm: '',
        mnumber: '',
        blname: '',
        // agent: '',
        dtype: '',
        from: '',
        to: '',
        // selectAll: false,
        // appReceived: false,
        // inUnderwriting: false,
        // readyToFund: false,
    })
  }


  return (
    <div className="w-full p-5">
        <div className="flex flex-col gap-2">
            <span>{t("dealsSearch.DealsSearch")}</span>
            <div className="rounded-md border-2 p-5">
                <form action="" onSubmit={handleSubmit} className="" >
                    <div className="w-full flex p-5 flex-col md:flex-row lg:flex-row justify-between items-center gap-5">
                    {/* First Col */}
                    {/* md:w-2/5 */}
                    <div className="w-full md:w-2/4 flex flex-col gap-2">
                        {/* <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="bdm">{t("dealsSearch.BDM")}</label>
                            <input value={formData.bdm} onChange={handleChange} autoComplete="off" id="bdm" type='text' />
                        </div> */}
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="mnumber">{t("dealsSearch.MortgageNumber")}</label>
                            <input value={formData.mnumber} onChange={handleChange} autoComplete="off" id="mnumber" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="blname">{t("dealsSearch.BorrowerLastName")}</label>
                            <input value={formData.blname} onChange={handleChange} autoComplete="off" id="blname" type='text' />
                        </div>
                    </div>
                    {/* Second Col */}
                    <div className="w-full md:w-2/4 flex flex-col justify-between gap-2">
                        {/* <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="agent">{t("dealsSearch.Agent")}</label>
                            <input value={formData.agent} onChange={handleChange} autoComplete="off" id="agent" type='text' />
                        </div> */}
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="dtype">{t("dealsSearch.DateType")}</label>
                            <select className="px-2 py-2.5 w-2/3 rounded-md" value={formData.dtype} onChange={handleChange} id="dtype">
                                <option>{t("dealsSearch.ADate")}</option>
                                <option>{t("dealsSearch.CDate")}</option>
                            </select>
                        </div>


                        <div className="flex gap-2">
                            <div className="w-full flex justify-between items-center gap-2">
                                <label htmlFor="from">{t("dealsSearch.From")}</label>
                                <input value={formData.from} onChange={handleChange} autoComplete="off" id="from" type='date' />
                            </div>
                            <div className="w-full flex justify-between items-center gap-2">
                                <label htmlFor="to">{t("dealsSearch.To")}</label>
                                <input value={formData.to} onChange={handleChange} autoComplete="off" id="to" type='date' />
                            </div>
                        </div>
                    </div>
                    {/* Third Col */}
                    {/* <div className="w-full md:w-1/5 flex flex-col gap-2">
                        <div className="w-full flex justify-between items-center gap-2">
                            <input value={formData.selectAll} checked={formData.selectAll} onChange={handleChange} autoComplete="off" id="selectAll" type='checkbox' />
                            <label htmlFor="selectAll">{t("dealsSearch.SelectAll")}</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input value={formData.appReceived} checked={formData.appReceived} onChange={handleChange} autoComplete="off" id="appReceived" type='checkbox' />
                            <label htmlFor="appReceived">{t("dealsSearch.AppReceived")}</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input value={formData.inUnderwriting} checked={formData.inUnderwriting} onChange={handleChange} autoComplete="off" id="inUnderwriting" type='checkbox' />
                            <label htmlFor="inUnderwriting">{t("dealsSearch.InUnderwriting")}</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input value={formData.readyToFund} checked={formData.readyToFund} onChange={handleChange} autoComplete="off" id="readyToFund" type='checkbox' />
                            <label htmlFor="readyToFund">{t("dealsSearch.ReadyToFund")}</label>
                        </div>
                    </div> */}
                    </div>
                    <div className="w-full flex justify-around items-center gap-2 mt-5">
                        <button onClick={handleClear} className="w-full bg-zinc-500">{t("dealsSearch.btn.ClearSearch")}</button>
                        <Button variant={"search"} type={"submit"} label={t("dealsSearch.btn.Search")} />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

DealsSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

export default DealsSearch