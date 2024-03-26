import PropTypes from 'prop-types';
// import Button from '../Button';
import { useEffect, useState } from 'react';
import { getConditionTrackingByAccoundId } from '../../api/api';
import { TiTick, TiTimes } from "react-icons/ti";
import Loading from "../Loading";
import { BiError } from 'react-icons/bi';

function Conditions({ accountID }) {
  const [accountConditions, setAccountConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function isEmptyObject(obj) {
    return obj && obj.accountConditionsList && obj.accountConditionsList.length === 0;
  }  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const apiData = await getConditionTrackingByAccoundId(accountID);
        if (apiData) {
          console.log(apiData.accountConditionsList);
          setAccountConditions(apiData.accountConditionsList);
          setLoading(false)
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    fetchData();
  }, [accountID]);

  const handleModal = (condition) => {
    console.log("Opening modal");
    setSelectedCondition(condition);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalOpen(false);
  };

  return (
    <>
      {!isEmptyObject(accountConditions) ?
        <>
          {!loading ? 
            <>
              {accountConditions.map((condition, index) => (
                <div
                  onClick={() => handleModal(condition)}
                  key={index}
                  className="border-2 p-2 flex justify-between items-center w-full md:w-2/3 rounded-lg gap-2 cursor-pointer hover:bg-zinc-100"
                >
                  <div className='flex items-center gap-2'>
                    {/* <span>{index + 1}.</span> */}
                    {" "}
                    <span>{condition.conditionSetup}</span>
                    <>
                      {condition.isVerified ? 
                        <span className='flex gap-2 rounded-full text-green-500 items-center justify-between px-3 py-1 bg-green-50'>Satisfied<TiTick className='text-green-500' size={20} /></span> 
                        : 
                        <span className='flex gap-2 rounded-full text-red-500 items-center justify-between px-3 py-1 bg-red-50'>Unsatisfied<TiTimes className='text-red-500' size={20} /></span> 
                      }
                    </>
                  </div>
                  {/* <div className="flex justify-around gap-2">
                    <Button variant={"docUpload"} />
                  </div> */}
                </div>
              ))}
            </>
            :
            <Loading/>
          }
        </>
        :
        <div className="w-full text-center p-5 italic text-zinc-500">
          <BiError size={50} className="text-red-500 text-center w-full mb-2 animate-bounce" />No data found.<br/>Please try again later.
        </div>
      }
      {/* Modal */}
      {isModalOpen && selectedCondition && (
        <div onClick={closeModal} className="absolute cursor-zoom-out h-screen top-0 left-0 w-full z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-12 rounded-lg flex flex-col gap-4 justify-center z-50 items-center max-w-2xl relative">
            <span className="cursor-pointer text-gray-500 text-xl absolute top-2 right-2" onClick={closeModal}>&times;</span>
            <p className='text-xl font-semibold'>{selectedCondition.conditionSetup}</p>
            <p className='text-justify'>{selectedCondition.clause}</p>
            {selectedCondition.note && 
              <p className='flex items-center justify-center w-full gap-2'>
                <span className='px-2.5 py-1 text-sm rounded-full border border-zinc-500 text-zinc-500'>NOTE : <span className='italic text-black'>{selectedCondition.note}</span></span>
              </p>
            }
            <div className='flex gap-2 mt-4'>
              <span className='flex items-center'>
                Active:{" "}
                {selectedCondition.isActive ? 
                  (
                    <>
                      <TiTick className='text-green-500' size={20} />
                    </>
                  ) 
                  : 
                  <>
                    <TiTimes className='text-red-500' size={20} />
                  </>
                }
              </span>
              <span className='flex items-center'>
                Received:{" "}
                {selectedCondition.isReceived ?
                  (
                    <>
                      <TiTick className='text-green-500' size={20} />
                    </>
                  ) 
                  : 
                  <>
                    <TiTimes className='text-red-500' size={20} />
                  </>
                }
              </span>
              <span className='flex items-center'>
                Verified:{" "}
                {
                  selectedCondition.isVerified ?
                  (
                    <>
                      <TiTick className='text-green-500' size={20} />
                    </>
                  ) 
                  : 
                  <>
                    <TiTimes className='text-red-500' size={20} />
                  </>
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Conditions.propTypes = {
  accountID: PropTypes.string.isRequired,
};

export default Conditions;