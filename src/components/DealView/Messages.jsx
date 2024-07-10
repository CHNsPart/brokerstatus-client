import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import Button from "../Button";
export default function Messages({ topic, conversation }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-col w-full justify-between items-start border-2 p-2 rounded-lg">
      <div className="flex flex-col md:flex-col w-full justify-between items-start">
        <div className="border-2 p-2 flex justify-between items-center w-full rounded-lg mb-2.5">
          <span>{topic}</span>
          <div className="flex justify-around gap-2">
            <Button variant={"reply"} label={t("dealView.messages.Reply")} />
          </div>
        </div>
        {conversation && conversation.map((con, index) => (
          <div key={index} className="flex flex-col w-full px-5 md:px-10 text-wrap">
            <div className="flex flex-col justify-between md:flex-row w-full mb-2.5">
              <div className="flex gap-2">
                <span className="">{con.sender}</span>
                <span className="font-bold">»</span>
                <span className="">{con.receiver}</span>
              </div>
              <div>
                <span className="w-full italic">{con.timestamp}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between md:flex-row w-full border-2 p-2 rounded-lg mb-2.5">
              {con.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Messages.propTypes = {
  topic: PropTypes.string.isRequired,
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string,
      receiver: PropTypes.string,
      timestamp: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};

