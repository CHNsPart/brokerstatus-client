





// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from './Button';
// import { useTranslation } from 'react-i18next';
// import { getClientBrokerAgentAccountSummaries } from '../api/api';

// function PipelineDeals({ searchData }) {
//   const { t } = useTranslation();

//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;
//   const [pageSize, setPageSize] = useState(100); // Default pageSize

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiData = await getClientBrokerAgentAccountSummaries(currentPage, pageSize);
//         if (apiData) {
//           console.log(apiData.length);
//           setData(apiData);
//           setPageSize(apiData.length)
//         } else {
//           console.error('Failed to fetch data for PipelineDeals.');
//         }
//       } catch (error) {
//         console.error('Error fetching data for PipelineDeals:', error.message);
//       }
//     };

//     fetchData();
//   }, []); // Update data when currentPage or pageSize changes

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

//   useEffect(() => {
//     console.log('Search Data:', searchData);
//     // Add logic to filter or update data based on searchData
//   }, [searchData]);

//   const handleTableBtn = (cellIndex) => {
//     // define the accountID from the event
//     if (cellIndex === 2) {
//       window.location.href = `/dview${accountID}`;
//     }
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   // Generate an array of page numbers based on the total number of pages
//   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

//   function formatCamelCaseString(inputString) {
//     // Add a space before every capital letter, except when the next letter is also capital
//     return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
//   }
  


//   return (
//     <div className="w-full h-fit p-5">
//       <div className="flex flex-col h-full gap-2">
//         <span>Pipeline Deals</span>
//         <div className="rounded-md h-full border-2 p-5 overflow-auto">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 {Object.keys(data[0] || {}).map((key) => (
//                   <th key={key} className="border p-2">{formatCamelCaseString(key)}</th>
//                 ))}
//                 <th className="border p-2">{t('Actions')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, rowIndex) => (
//                 <tr className='' key={rowIndex}>
//                   {Object.values(row).map((cell, cellIndex) => (
//                     <td key={cellIndex} className="border p-2">
//                       <span onClick={() => handleTableBtn(cellIndex)} className={`${cellIndex === 2 ? `text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100` : ``}`}>{cell}</span>
//                     </td>
//                   ))}
//                     <td className="border px-5 w-full h-full p-2 flex gap-2 items-center justify-around">
//                         <Button variant={"docUpload"} />
//                         <Button variant={"msg"} />
//                     </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-center mt-4">
//             {pageNumbers.map((pageNumber) => (
//               <button
//                 key={pageNumber}
//                 onClick={() => paginate(pageNumber)}
//                 className={`mx-1 p-2 border rounded-full ${currentPage === pageNumber ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
//               >
//                 {pageNumber}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// PipelineDeals.propTypes = {
//   searchData: PropTypes.object,
// };

// export default PipelineDeals;














import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { getClientBrokerAgentAccountSummaries } from '../api/api';

function PipelineDeals({ searchData }) {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [pageSize, setPageSize] = useState(100); // Default pageSize

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const apiData = await getClientBrokerAgentAccountSummaries(currentPage, pageSize);
    //     if (apiData) {
    //       console.log(apiData.length);
    //       setData(apiData);
    //       setFilteredData(apiData); 
    //       setPageSize(apiData.length);
    //     } else {
    //       console.error('Failed to fetch data for PipelineDeals.');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching data for PipelineDeals:', error.message);
    //   }
    // };

    const fetchData = async () => {
      try {
        const apiData = await getClientBrokerAgentAccountSummaries(currentPage, pageSize);
        if (apiData) {
          setData(apiData);
          applyFilters(apiData);  // Apply filters to the fetched data
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };
    
    const applyFilters = (apiData) => {
      if (!searchData) {
        // If searchData is null or undefined, do not proceed with filtering
        setFilteredData(apiData);
        setPageSize(apiData.length);
        return;
      }
    
      let updatedData = apiData;
    
      // Filter by brokerUniqueID (mnumber)
      if (searchData.mnumber) {
        updatedData = updatedData.filter(item => item.brokerUniqueID.includes(searchData.mnumber));
      }
    
      // Filter by brokerName (blname)
      if (searchData.blname) {
        updatedData = updatedData.filter(item => item.brokerName.includes(searchData.blname));
      }
    
      // Filter by date (applicationDate or closingDate)
      if (searchData.dtype && searchData.from && searchData.to) {
        const dateField = searchData.dtype === 'Application Date' ? 'applicationDate' : 'closingDate';
        updatedData = updatedData.filter(item => {
          const date = new Date(item[dateField]).setHours(0, 0, 0, 0);
          const fromDate = new Date(searchData.from).setHours(0, 0, 0, 0);
          const toDate = new Date(searchData.to).setHours(0, 0, 0, 0);
          return date >= fromDate && date <= toDate;
        });
      }
    
      // Update filteredData with the filtered results
      setFilteredData(updatedData);
    
      // Reset pagination to the first page
      setCurrentPage(1);
    };
    

    fetchData();
  }, [searchData]); // Update data when currentPage or pageSize changes

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  

  useEffect(() => {
    console.log('Search Data:', searchData);
    // Apply filters when searchData changes
    // applyFilters();
  }, [searchData]);

  const handleTableBtn = (accountID) => {
    window.location.href = `/dview/${accountID}`;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Generate an array of page numbers based on the total number of pages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  function formatCamelCaseString(inputString) {
    // Add a space before every capital letter, except when the next letter is also capital
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
  }


  return (
    <div className="w-full h-fit p-5">
      <div className="flex flex-col h-full gap-2">
        <span>Pipeline Deals</span>
        <div className="rounded-md h-full border-2 p-5 overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th key={key} className="border p-2">
                    {formatCamelCaseString(key)}
                  </th>
                ))}
                <th className="border p-2">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr className="" key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">
                      {cellIndex === 3 ? (
                        <span
                          onClick={() => handleTableBtn(row.accountID)}
                          className={`text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100`}
                        >
                          {cell}
                        </span>
                      ) : (
                        <span>{cell}</span>
                      )}
                    </td>
                  ))}
                  <td className="border px-5 w-full h-full p-2 flex gap-2 items-center justify-around">
                    <Button variant={"docUpload"} />
                    {/* <Button variant={"msg"} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`mx-1 p-2 border rounded-full ${
                  currentPage === pageNumber ? 'bg-gray-500 text-white' : 'bg-white text-black'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

PipelineDeals.propTypes = {
  searchData: PropTypes.object,
};

export default PipelineDeals;




