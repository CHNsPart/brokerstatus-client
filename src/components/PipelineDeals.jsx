
import { useState } from 'react';

function PipelineDeals() {
  // Example data from the backend
  const initialData = {
    columns: [
      'Broker',
      'BDM',
      'Status',
      'Mortgage #',
      'Purpose',
      'Borrower Name',
      'App Date',
      'Closing Date',
      'Amount',
      'Condition',
      'Actions', // 11th column for rounded action buttons
    ],
    rows: [
      ['--', '--', 'Approved', '1714935', 'Purchased', 'Test Borrower', '16/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714936', 'Purchased', 'Test Borrower', '17/11/2023', '22/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714937', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714938', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$206', '5/10'],
      ['--', '--', 'Approved', '1714939', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714910', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714921', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714911', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714936', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714930', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714958', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
      ['--', '--', 'Approved', '1714995', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],    ],
  };

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
    <div className="w-full h-full p-5">
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
                    <button className="rounded-full bg-green-500 p-2 text-white">Action 1</button>
                    <button className="rounded-full bg-blue-500 p-2 text-white">Action 2</button>
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

export default PipelineDeals;
