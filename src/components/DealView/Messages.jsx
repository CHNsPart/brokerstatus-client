// import PropTypes from "prop-types";

// export default function Messages({ topic, sender, receiver, conversation }) {
//   return (
//     <div className="flex flex-col md:flex-col w-full justify-between items-start border-2 p-2 rounded-lg">
//         <div className="flex flex-col md:flex-col w-full justify-between items-start">
//             <div className="border-2 p-2 flex justify-between items-center w-full rounded-lg mb-2.5">
//                 <span>Message Topic 1</span>
//                 <div className="flex justify-around gap-2">
//                     <button className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 px-5 text-white">Reply</button>
//                 </div>
//             </div>
//             <div className="flex flex-col w-full md:w-2/3 px-5 md:px-10 text-wrap">
//                 <div className="flex flex-col justify-between md:flex-row w-full mb-2.5">
//                     <div className="flex gap-2">
//                         <span className="md:w-1/2">Sender</span>
//                         <span className="font-bold">»</span>
//                         <span className="md:w-1/2">Receiver</span>
//                     </div>
//                     <div>
//                         <span className="w-full md:w-1/2">11/27/2023 11:00am</span>
//                     </div>
//                 </div>
//                 <div className="flex flex-col justify-between md:flex-row w-full border-2 p-2 rounded-lg mb-2.5">
//                     Document X has been uploaded to satisfy condition y
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// Messages.propTypes = {
//     topic: PropTypes.string.isRequired,
//     sender: PropTypes.string.isRequired,
//     receiver: PropTypes.string.isRequired,
//     conversation: PropTypes.object,
// };


// import PropTypes from "prop-types";

// export default function Messages({ topic, conversation }) {
//   return (
//     <div className="flex flex-col md:flex-col w-full justify-between items-start border-2 p-2 rounded-lg">
//       <div className="flex flex-col md:flex-col w-full justify-between items-start">
//         <div className="border-2 p-2 flex justify-between items-center w-full rounded-lg mb-2.5">
//           <span>{topic}</span>
//           <div className="flex justify-around gap-2">
//             <button className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 px-5 text-white">Reply</button>
//           </div>
//         </div>
//         {conversation && conversation.map((con)=>{
//             <div className="flex flex-col w-full md:w-2/3 px-5 md:px-10 text-wrap">
//                 <div className="flex flex-col justify-between md:flex-row w-full mb-2.5">
//                     <div className="flex gap-2">
//                     <span className="md:w-1/2">{con.sender}</span>
//                     <span className="font-bold">»</span>
//                     <span className="md:w-1/2">{con.receiver}</span>
//                     </div>
//                     <div>
//                     <span className="w-full md:w-1/2">{con.timestamp}</span>
//                     </div>
//                 </div>
//                 <div className="flex flex-col justify-between md:flex-row w-full border-2 p-2 rounded-lg mb-2.5">
//                     {con.message}
//                 </div>
//             </div>
//         })}
//       </div>
//     </div>
//   );
// }

// Messages.propTypes = {
//     topic: PropTypes.string.isRequired,
//     conversation: PropTypes.shape([
//         {
//             sender: PropTypes.string,
//             receiver: PropTypes.string,
//             timestamp: PropTypes.string,
//             message: PropTypes.string,
//         }
//     ]),
// };

import PropTypes from "prop-types";

export default function Messages({ topic, conversation }) {
  return (
    <div className="flex flex-col md:flex-col w-full justify-between items-start border-2 p-2 rounded-lg">
      <div className="flex flex-col md:flex-col w-full justify-between items-start">
        <div className="border-2 p-2 flex justify-between items-center w-full rounded-lg mb-2.5">
          <span>{topic}</span>
          <div className="flex justify-around gap-2">
            <button className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 px-5 text-white">Reply</button>
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

