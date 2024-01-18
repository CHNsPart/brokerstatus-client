import Button from "./Button"
import { useTranslation } from 'react-i18next';

function DealsSearch() {
  const { t } = useTranslation();
  return (
    <div className="w-full p-5">
        <div className="flex flex-col gap-2">
            <span>{t("dealsSearch.DealsSearch")}</span>
            <div className="rounded-md border-2 p-5">
                <form action="" className="" >
                    <div className="w-full flex p-5 flex-col md:flex-row lg:flex-row justify-between items-center gap-5">
                    {/* First Col */}
                    <div className="w-full md:w-2/5 flex flex-col gap-2">
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="bdm">{t("dealsSearch.BDM")}</label>
                            <input autoComplete="off" id="bdm" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="mnumber">{t("dealsSearch.MortgageNumber")}</label>
                            <input autoComplete="off" id="mnumber" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="blname">{t("dealsSearch.BorrowerLastName")}</label>
                            <input autoComplete="off" id="blname" type='text' />
                        </div>
                    </div>
                    {/* Second Col */}
                    <div className="w-full md:w-2/5 flex flex-col justify-between gap-2">
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="agent">{t("dealsSearch.Agent")}</label>
                            <input autoComplete="off" id="agent" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="dtype">{t("dealsSearch.DateType")}</label>
                            <input autoComplete="off" id="dtype" type='date' />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-full flex justify-between items-center gap-2">
                                <label htmlFor="from">{t("dealsSearch.From")}</label>
                                <input autoComplete="off" id="from" type='text' />
                            </div>
                            <div className="w-full flex justify-between items-center gap-2">
                                <label htmlFor="to">{t("dealsSearch.To")}</label>
                                <input autoComplete="off" id="to" type='text' />
                            </div>
                        </div>
                    </div>
                    {/* Third Col */}
                    <div className="w-full md:w-1/5 flex flex-col gap-2">
                        {/* <div className="w-full h-full"> */}
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="selectAll" type='checkbox' />
                            <label htmlFor="selectAll">{t("dealsSearch.SelectAll")}</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="appReceived" type='checkbox' />
                            <label htmlFor="appReceived">{t("dealsSearch.AppReceived")}</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="inUnderwriting" type='checkbox' />
                            <label htmlFor="inUnderwriting">{t("dealsSearch.InUnderwriting")}</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="readtToFund" type='checkbox' />
                            <label htmlFor="readtToFund">{t("dealsSearch.ReadyToFund")}</label>
                        </div>
                        {/* </div> */}
                    </div>
                    </div>
                    <div className="w-full flex justify-around items-center gap-2 mt-5">
                        <Button variant={"search"} label={t("dealsSearch.btn.ClearSearch")} />
                        <Button variant={"search"} type={"submit"} label={t("dealsSearch.btn.Search")} />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default DealsSearch






