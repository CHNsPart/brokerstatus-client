
// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from './Button';
// import { useTranslation } from 'react-i18next';
// import { getClientBrokerAgentAccountSummaries } from '../api/api';

// function PipelineDeals({ searchData }) {
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getClientBrokerAgentAccountSummaries(1, 10); // Adjust page and pageSize accordingly
//         if (data) {
//           console.log(data)
//           setData(data)
//         } else {
//           console.error('Failed to fetch initial data for PipelineDeals.');
//         }
//       } catch (error) {
//         console.error('Error fetching initial data for PipelineDeals:', error.message);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs once on component mount


//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;
//   // Calculate the index range for the current page
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = data.rows.slice(indexOfFirstRow, indexOfLastRow);

//   useEffect(() => {
//     // Use searchData to filter or update data as needed
//     console.log('Search Data:', searchData);
//   }, [searchData]);

//   const handleTableBtn = (cell) => {
//     if(cell === 3) {
//       window.location.href = "/dview"
//     }
//   }

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="w-full h-fit p-5">
//       <div className="flex flex-col h-full gap-2">
//         <span>Pipleline Deals</span>
//         <div className="rounded-md h-full border-2 p-5 overflow-auto">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 {data.columns.map((col, index) => (
//                   <th key={index} className="border p-2">{t(col)}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {row.map((cell, cellIndex) => (
//                     <td key={cellIndex} className={`border p-2`}>
//                       <span onClick={()=>handleTableBtn(cellIndex)} className={`${cellIndex===3 ? `text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100` : ``}`}>{cell}</span>
//                     </td>
//                   ))}
//                   <td className="border p-2 flex justify-around">
//                     <Button variant={"docUpload"} />
//                     <Button variant={"msg"} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* Pagination */}
//           <div className="flex justify-center mt-4">
//             {Array.from({ length: Math.ceil(data.rows.length / rowsPerPage) }, (_, index) => (
//               <button
//                 key={index}
//                 onClick={() => paginate(index + 1)}
//                 className={`mx-1 p-2 border rounded-full ${currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// PipelineDeals.propTypes = {
//   initialData: PropTypes.object,
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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [pageSize, setPageSize] = useState(100); // Default pageSize

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getClientBrokerAgentAccountSummaries(currentPage, pageSize);
        if (apiData) {
          console.log(apiData.length);
          setData(apiData);
          setPageSize(apiData.length)
        } else {
          console.error('Failed to fetch data for PipelineDeals.');
        }
      } catch (error) {
        console.error('Error fetching data for PipelineDeals:', error.message);
      }
    };

    fetchData();
  }, []); // Update data when currentPage or pageSize changes

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    console.log('Search Data:', searchData);
    // Add logic to filter or update data based on searchData
  }, [searchData]);

  const handleTableBtn = (cellIndex) => {
    if (cellIndex === 3) {
      window.location.href = "/dview";
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Generate an array of page numbers based on the total number of pages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // function formatCamelCaseString(inputString) {
  //   // Add a space before every capital letter, then capitalize the first letter
  //   return inputString.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  // }
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
                  <th key={key} className="border p-2">{formatCamelCaseString(key)}</th>
                ))}
                <th className="border p-2">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr className='' key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">
                      <span onClick={() => handleTableBtn(cellIndex)} className={`${cellIndex === 2 ? `text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100` : ``}`}>{cell}</span>
                    </td>
                  ))}
                    <td className="border px-5 w-full h-full p-2 flex gap-2 items-center justify-around">
                        <Button variant={"docUpload"} />
                        <Button variant={"msg"} />
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
                className={`mx-1 p-2 border rounded-full ${currentPage === pageNumber ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
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





