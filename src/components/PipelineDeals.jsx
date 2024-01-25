
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { useTranslation } from 'react-i18next';

function PipelineDeals({initialData, searchData}) {
  const { t } = useTranslation();
  const [data] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.rows.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    // Use searchData to filter or update data as needed
    console.log('Search Data:', searchData);
  }, [searchData]);

  const handleTableBtn = (cell) => {
    if(cell === 3) {
      window.location.href = "/dview"
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-fit p-5">
      <div className="flex flex-col h-full gap-2">
        <span>Pipleline Deals</span>
        <div className="rounded-md h-full border-2 p-5 overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                {data.columns.map((col, index) => (
                  <th key={index} className="border p-2">{t(col)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={`border p-2`}>
                      <span onClick={()=>handleTableBtn(cellIndex)} className={`${cellIndex===3 ? `text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100` : ``}`}>{cell}</span>
                    </td>
                  ))}
                  <td className="border p-2 flex justify-around">
                    <Button variant={"docUpload"} />
                    <Button variant={"msg"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(data.rows.length / rowsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 p-2 border rounded-full ${currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

PipelineDeals.propTypes = {
  initialData: PropTypes.object,
  searchData: PropTypes.object,
};

export default PipelineDeals;
















// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from './Button';
// import { useTranslation } from 'react-i18next';

// function PipelineDeals({ initialData, searchData }) {
//   const { t } = useTranslation();
//   const [data] = useState(initialData);
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
//     if (cell === 3) {
//       window.location.href = "/dview";
//     }
//   };

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const renderTable = () => {
//     if (!searchData) {
//       // If no searchData, show the full table
//       return (
//         <>
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
//                       <span onClick={() => handleTableBtn(cellIndex)} className={`${cellIndex === 3 ? `text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100` : ``}`}>{cell}</span>
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
//         </>
//       );
//     } else {
//       // If searchData is present, filter the rows based on your logic
//       const filteredRows = data.rows.filter((row) => {
//         // Replace this logic with your own matching criteria
//         return row.some((cell) => cell.includes(searchData));
//       });

//       if (filteredRows.length > 0) {
//         // If matched rows are found, display only the matched rows
//         return (
//           <>
//             <table className="w-full">
//               <thead>
//                 <tr>
//                   {data.columns.map((col, index) => (
//                     <th key={index} className="border p-2">{t(col)}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRows.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td key={cellIndex} className={`border p-2`}>
//                         <span onClick={() => handleTableBtn(cellIndex)} className={`${cellIndex === 3 ? `text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100` : ``}`}>{cell}</span>
//                       </td>
//                     ))}
//                     <td className="border p-2 flex justify-around">
//                       <Button variant={"docUpload"} />
//                       <Button variant={"msg"} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         );
//       } else {
//         // If no matched rows are found, display a message
//         return (
//           <div className="text-center mt-4">{t('No matching rows found for the search criteria.')}</div>
//         );
//       }
//     }
//   };

//   return (
//     <div className="w-full h-fit p-5">
//       <div className="flex flex-col h-full gap-2">
//         <span>Pipeline Deals</span>
//         <div className="rounded-md h-full border-2 p-5 overflow-auto">
//           {renderTable()}
//         </div>
//       </div>
//     </div>
//   );
// }

// PipelineDeals.propTypes = {
//   initialData: PropTypes.object,
//   searchData: PropTypes.string,
// };

// export default PipelineDeals;

