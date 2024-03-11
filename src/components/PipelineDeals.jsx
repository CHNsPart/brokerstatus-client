import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { getBrokerPipelineAccounts, getBrokerAccounts } from '../api/api';
import Loading from './Loading';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import isBetween from 'dayjs/plugin/isBetween'; // Import the isBetween plugin
import { Tooltip } from 'react-tooltip'
import useTheme from '../hooks/useTheme';
import { jwtDecode } from 'jwt-decode';
import { themes } from '../lib/theme';
// import { getSubdomain } from '../lib/utils';

dayjs.locale('en');
dayjs.extend(isBetween);
function PipelineDeals({ searchData, allDocs }) {
  const { t } = useTranslation();
  useTheme(); 

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [pageSize, setPageSize] = useState(100); // Default pageSize
  const [loading, setLoading] = useState(false);
  // const [subdomain, setSubdomain] = useState(getSubdomain());
  const getTenant = () => {
    const token = localStorage.getItem("authToken");

    if(token) {
      const decodedToken = jwtDecode(token);
      const { TenantName } = decodedToken; 

      return TenantName.toLowerCase();
    }
  }

const [subdomain] = useState(getTenant());

  useEffect(() => {

    const fetchData = async () => {
      if(allDocs){
        try {
          setLoading(true)
          const apiData = await getBrokerAccounts(currentPage, pageSize);
          if (apiData) {
            // console.log("all",apiData)
            setData(apiData);
            applyFilters(apiData);
            setLoading(false)

            const theme = themes[subdomain] || themes.default;
            const labeledHeaderCells = document.querySelectorAll('table thead tr.labels th.labels');
            labeledHeaderCells.forEach((cell) => {
              cell.style.color = theme.labelColor;
            });
          } else {
            console.error('Failed to fetch data for PipelineDeals.');
            setLoading(false)
          }
        } catch (error) {
          console.error('Error fetching data for PipelineDeals:', error.message);
          setLoading(false)
        }
      } else {
        try {
          setLoading(true)
          const apiData = await getBrokerPipelineAccounts(currentPage, pageSize);
          if (apiData) {
            // console.log("pipe",apiData)
            setData(apiData);
            applyFilters(apiData);
            setLoading(false)

            // const token = localStorage.getItem("authToken");

            // if(token) {
            //   const decodedToken = jwtDecode(token);
            //   const { TenantName } = decodedToken;
            //   setSubdomain(TenantName.toLowerCase());
            // }

            // const theme = themes[subdomain] || themes.default;

            // const label = document.getElementsByClassName('labels');
            // if(label) {
            //   for (let i = 0; i < label.length; i++) {
            //     label[i].style.color =  theme.labelColor;
            //   }
            // }

            const theme = themes[subdomain] || themes.default;
            const labeledHeaderCells = document.querySelectorAll('table thead tr.labels th.labels');
            labeledHeaderCells.forEach((cell) => {
              cell.style.color = theme.labelColor;
            });

          } else {
            console.error('Failed to fetch data for PipelineDeals.');
            setLoading(false)
          }
        } catch (error) {
          console.error('Error fetching data for PipelineDeals:', error.message);
          setLoading(false)
        }
      }
    };

    const applyFilters = (apiData) => {
      setLoading(true)
      if (!searchData) {
        // If searchData is null or undefined, do not proceed with filtering
        setFilteredData(apiData);
        setPageSize(apiData.length);
        return;
      }

      let updatedData = apiData;

      if (searchData.mnumber) {
        updatedData = updatedData.filter(item => item.Mortgage.includes(searchData.mnumber));
      }

      if (searchData.blname) {
        updatedData = updatedData.filter(item => item.BorrowerName.toLowerCase().includes(searchData.blname.toLowerCase()));
      }

      if (searchData.dtype && searchData.from && searchData.to) {
        const dateField = searchData.dtype === 'Application Date' ? 'App Date' : 'Closing Date';

        updatedData = updatedData.filter(item => {
          const date = dayjs(item[dateField], 'YYYY-MM-DD'); // Parse the date with the correct format
          const fromDate = dayjs(searchData.from, 'YYYY-MM-DD');
          const toDate = dayjs(searchData.to, 'YYYY-MM-DD').endOf('day');

          setLoading(false);
          return date.isBetween(fromDate, toDate, null, '[]');
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

  const handleTableBtn = (mortgageNumber) => {
    console.log(mortgageNumber);
    window.location.href = `/dview/${mortgageNumber}`;
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
        { allDocs ?
          <span className='labels text-xl font-semibold'>{t("dealsSearch.AllDocs")}</span>
          :
          <span className='labels text-xl font-semibold'>{t("dealsSearch.PipelineDeals")}</span>
        }
          {!loading ?
            <div className="rounded-md h-full border-2 p-5 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className='labels'>
                    {Object.keys(data[0] || {}).map((key) => (
                      <th key={key} className="labels border p-2">
                        {key === "Mortgage" ? t(`dealsSearch.Mortgage #`) : formatCamelCaseString(t(`dealsSearch.${key}`))}
                      </th>
                    ))}
                    <th className="labels border p-2">{t('Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, rowIndex) => (
                    <tr className="" key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex} className="border p-2">
                          {cellIndex === 3 ? (
                            <span
                              onClick={() => handleTableBtn(row.Mortgage)}
                              className={`text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100`}
                            >
                              {cell}
                            </span>
                          ) : (
                            <span>{cell}</span>
                          )}
                        </td>
                      ))}
                      <td className="border px-5 w-full h-full p-2 flex gap-2 items-center justify-around" data-tooltip-content="Document Upload Button" data-tooltip-id="uploadTooltip">
                        <Button variant={"docUpload"} />
                        {/* <Button variant={"msg"} /> */}
                      </td>
                      <Tooltip id="uploadTooltip" place="bottom" effect="solid" />
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
            :
            <Loading/>
          }
      </div>
    </div>
  );
}

PipelineDeals.propTypes = {
  searchData: PropTypes.object,
  allDocs: PropTypes.bool
};

export default PipelineDeals;




