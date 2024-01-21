import { HiOutlineUpload } from "react-icons/hi";
import Button from "../components/Button"
import { useTranslation } from 'react-i18next';
import { BiMessageAdd } from "react-icons/bi";
import LabeledInput from "../components/LabeledInput";
import { exampleDealViewConditions, exampleDealViewContactData, exampleDealViewDetailsData, exampleDealViewDocumentsData, getSubdomain, themes } from "../lib/theme";
import { useEffect, useState } from "react";
import Contacts from "../components/DealView/Contacts";
import Conditions from "../components/DealView/Conditions";
import Documents from "../components/DealView/Documents";
import Details from "../components/DealView/Details";

function DealView() {
  const { t } = useTranslation();
  const [tabs, setTabs] = useState("Details");

  useEffect(() => {
    // Run handleTabs on the initial render
    handleTabs({
      target: document.querySelector('.tabs') || document.createElement('div'), // Mock event
    });
  }, []);

  const handleTabs = (e) => {
    const buttons = document.querySelectorAll('.tabs');
    const clickedButton = e.target;
    setTabs(clickedButton.textContent)

    const subdomain = getSubdomain();
    const theme = themes[subdomain] || themes.default;
  
    buttons.forEach((button) => {
      button.style.backgroundColor = "transparent";
      button.style.color = "black";
    });
    
    clickedButton.style.backgroundColor = theme.primaryButtonBgColor;
    clickedButton.style.color = theme.primaryButtonTextColor;
};
    
  return (
    <section className="flex-grow w-full flex flex-col justify-start items-center gap-2 p-5">
        <div className="w-full h-fit flex flex-col justify-between gap-5">
            <a className="w-fit" href="/deals">
                <Button label={t(`dealView.BacktoList`)}  />
            </a>
            <div className="border-2 p-5">
                <div className="border-2 p-2 flex justify-between items-center rounded-lg mb-5">
                   <span className="mr-2">1810631 (CMLS-30333332) - Test Borrower - (Outstanding Condition 2/10)</span>
                   <div className="flex justify-around gap-2">
                    <button className="rounded-full bg-green-500 hover:bg-green-700 p-2 text-white"><HiOutlineUpload/></button>
                    <button className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 text-white"><BiMessageAdd/></button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                    <div className="flex flex-col w-full gap-5 items-center">
                        <LabeledInput label="Amount" type="text" value="100" />
                        <LabeledInput label="Property" type="text" value="100" />
                    </div>
                    <div className="flex flex-col w-full gap-5 items-center">
                        <LabeledInput label="Closing" type="text" value="100" />
                        <LabeledInput label="Product" type="text" value="100" />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between gap-5">
            <div className="border-2 p-5 flex flex-col gap-5">
                <ul className="flex flex-wrap w-fit border-2 rounded-lg text-sm gap-2 font-medium text-center">
                    {["Details", "Contacts", "Conditions", "Documents", "Messages"].map((label, index) => (
                    <li key={index}>
                        <Button variant={"tabs"} onClick={handleTabs} label={label} />
                    </li>
                    ))}
                </ul>
                { tabs === "Details" &&            
                    <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
                        {/* <div className="w-full flex flex-col gap-5">
                            <LabeledInput label="Purpose of Loan" type="text" value="100" />
                            <LabeledInput label="Request of Amount" type="text" value="100" />
                            <LabeledInput label="Est. Value/pur Price" type="text" value="100" />
                            <LabeledInput label="LTV" type="text" value="100" />
                            <LabeledInput label="Term" type="text" value="100" />
                            <LabeledInput label="Amortization" type="text" value="100" />
                            <LabeledInput label="Closing Date" type="text" value="100" />
                            <LabeledInput label="First Payment Date" type="text" value="100" />
                            <LabeledInput label="Solicitor Name" type="text" value="100" />
                            <LabeledInput label="Solicitor Firm" type="text" value="100" />
                        </div> */}
                        {/* <div className="w-full flex flex-col gap-5">
                            <LabeledInput label="Purpose of Loan" type="text" value="100" />
                            <LabeledInput label="Request of Amount" type="text" value="100" />
                            <LabeledInput label="Est. Value/pur Price" type="text" value="100" />
                            <LabeledInput label="LTV" type="text" value="100" />
                            <LabeledInput label="Term" type="text" value="100" />
                            <LabeledInput label="Amortization" type="text" value="100" />
                            <LabeledInput label="Closing Date" type="text" value="100" />
                            <LabeledInput label="First Payment Date" type="text" value="100" />
                            <LabeledInput label="Solicitor Name" type="text" value="100" />
                            <LabeledInput label="Solicitor Firm" type="text" value="100" />
                        </div> */}
                    <Details data={exampleDealViewDetailsData} />
                    </div>
                }
                { tabs === "Contacts" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        {exampleDealViewContactData.map((contact, index) => (
                            <Contacts key={index} {...contact} />
                        ))}
                    </div>
                }
                { tabs === "Conditions" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        {exampleDealViewConditions.map((condition) => (
                            <Conditions key={condition.index} {...condition} />
                        ))}
                    </div>
                }
                { tabs === "Documents" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        {exampleDealViewDocumentsData.map((document) => (
                            <Documents key={document.index} {...document} />
                        ))}
                    </div>
                }
            </div>
        </div>
    </section>
  )
}

export default DealView;
