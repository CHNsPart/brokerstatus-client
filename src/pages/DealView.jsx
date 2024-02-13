import Button from "../components/Button"
import { useTranslation } from 'react-i18next';
import { exampleDealViewContactData, exampleDealViewDocumentsData, exampleDealViewMessagesData } from "../lib/utils";
import { useEffect } from "react";
import Contacts from "../components/DealView/Contacts";
import Conditions from "../components/DealView/Conditions";
import Documents from "../components/DealView/Documents";
import Details from "../components/DealView/Details";
import Messages from "../components/DealView/Messages";
import useTabs from "../hooks/useTabs";
import { useParams } from "react-router-dom";
import PrimaryDetails from "../components/DealView/PrimaryDetails";

function DealView() {

  const { accountID } = useParams(); 
  const { t } = useTranslation();

  useEffect(() => {
    // Run handleTabs on the initial render
    handleTabs({
      target: document.querySelector('.tabs') || document.createElement('div'), // Mock event
    });
  }, []);

  const { activeTab, handleTabs } = useTabs();

  return (
    <section className="flex-grow w-full flex flex-col justify-start items-center gap-2 p-5">
        <div className="w-full h-fit flex flex-col justify-between gap-5">
            <a className="w-fit" href="/deals">
                <Button label={t(`dealView.backtoList`)}  />
            </a>
            <PrimaryDetails accountID={accountID} />
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
                { activeTab === "Details" &&            
                    <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
                        <Details accountID={accountID} />
                    </div>
                }
                { activeTab === "Contacts" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        {exampleDealViewContactData.map((contact, index) => (
                            <Contacts key={index} {...contact} />
                        ))}
                    </div>
                }
                { activeTab === "Conditions" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        <Conditions accountID={accountID} />
                    </div>
                }
                { activeTab === "Documents" &&            
                    <div className="flex flex-col md:flex-col w-full justify-between items-start gap-5">
                        {exampleDealViewDocumentsData.map((document) => (
                            <Documents key={document.index} {...document} />
                        ))}
                    </div>
                }
                { activeTab === "Messages" &&            
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