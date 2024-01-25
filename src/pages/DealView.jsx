import Button from "../components/Button"
import { useTranslation } from 'react-i18next';
import LabeledInput from "../components/LabeledInput";
import { exampleDealViewConditions, exampleDealViewContactData, exampleDealViewDetailsData, exampleDealViewDocumentsData, exampleDealViewMessagesData, getSubdomain, themes } from "../lib/theme";
import { useEffect, useState } from "react";
import Contacts from "../components/DealView/Contacts";
import Conditions from "../components/DealView/Conditions";
import Documents from "../components/DealView/Documents";
import Details from "../components/DealView/Details";
import Messages from "../components/DealView/Messages";

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
                <Button label={t(`dealView.backtoList`)}  />
            </a>
            <div className="border-2 p-5">
                <div className="border-2 p-2 flex justify-between items-center rounded-lg mb-5">
                   <span className="mr-2">1810631 (CMLS-30333332) - Test Borrower - (Outstanding Condition 2/10)</span>
                   <div className="flex justify-around gap-2">
                    <Button variant={"docUpload"} />
                    <Button variant={"msg"} />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                    <div className="flex flex-col w-full gap-5 items-center">
                        <LabeledInput label={"Amount"} type="text" value="100" />
                        <LabeledInput label={"Property"} type="text" value="100" />
                    </div>
                    <div className="flex flex-col w-full gap-5 items-center">
                        <LabeledInput label={"Closing"} type="text" value="100" />
                        <LabeledInput label={"Product"} type="text" value="100" />
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
                { tabs === "Messages" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        {exampleDealViewMessagesData.map((message, index) => (
                            <Messages key={index} {...message} />
                        ))}
                    </div>
                }
            </div>
        </div>
    </section>
  )
}

export default DealView;