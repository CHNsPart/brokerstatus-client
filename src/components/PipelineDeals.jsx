
import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineUpload } from "react-icons/hi";
import { BiMessageAdd } from "react-icons/bi";

function PipelineDeals({initialData}) {
  const [data] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.rows.slice(indexOfFirstRow, indexOfLastRow);

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
                  <th key={index} className="border p-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">{cell}</td>
                  ))}
                  <td className="border p-2 flex justify-around">
                    <button className="rounded-full bg-green-500 hover:bg-green-700 p-2 text-white"><HiOutlineUpload/></button>
                    <button className="rounded-full bg-blue-500 hover:bg-blue-700 p-2 text-white"><BiMessageAdd/></button>
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
};

export default PipelineDeals;
