import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { getBrokerPipelineAccounts, getBrokerAccounts } from '../api/api';
import Loading from './Loading';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import isBetween from 'dayjs/plugin/isBetween';
import { Tooltip } from 'react-tooltip'
import useTheme from '../hooks/useTheme';
import { jwtDecode } from 'jwt-decode';
import { themes } from '../lib/theme';

dayjs.locale('en');
dayjs.extend(isBetween);

function PipelineDeals({ searchData, allDocs }) {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(100);
  const [loading, setLoading] = useState(false);
  const [subdomain] = useState(getTenant());

  function getTenant() {
    const token = localStorage.getItem("authToken");
    if(token) {
      const decodedToken = jwtDecode(token);
      const { TenantName } = decodedToken; 
      return TenantName.toLowerCase();
    }
  }

  useEffect(() => {
    const theme = themes[subdomain];
    const labeledHeaderCells = document.querySelectorAll('table thead tr.labels th.labels');
    labeledHeaderCells.forEach((cell) => {
      cell.style.color = `${theme.labelColor} !important`;
      cell.classList.add = `text-${subdomain}`
    });
  }, [subdomain, searchData, data]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const apiData = allDocs 
        ? await getBrokerAccounts(1, 1000) // Fetch a large number of records
        : await getBrokerPipelineAccounts(1, 1000);
      
      if (apiData) {
        setData(apiData);
        return apiData;
      } else {
        console.error('Failed to fetch data for PipelineDeals.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data for PipelineDeals:', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [allDocs]);

  useEffect(() => {
    const initializeData = async () => {
      const apiData = await fetchData();
      applyFiltersAndSort(apiData, searchData);
    };

    initializeData();
  }, [fetchData]);

  useEffect(() => {
    const updateData = async () => {
      if (searchData === null || Object.values(searchData).some(value => value !== '')) {
        const apiData = await fetchData();
        applyFiltersAndSort(apiData, searchData);
      }
    };
  
    updateData();
  }, [searchData, fetchData]);

  const applyFiltersAndSort = (apiData, filters) => {
    if (!filters) {
      setFilteredData(apiData);
      setPageSize(apiData.length);
      return;
    }

    let updatedData = apiData;

    // Apply filters
    if (filters.mnumber) {
      updatedData = updatedData.filter(item => item.Mortgage.includes(filters.mnumber));
    }

    if (filters.blname) {
      updatedData = updatedData.filter(item => item.BorrowerName.toLowerCase().includes(filters.blname.toLowerCase()));
    }

    if (filters.dtype && filters.from && filters.to) {
      const dateField = filters.dtype === 'Application Date' ? 'App Date' : 'Closing Date';
      const fromDate = dayjs(filters.from);
      const toDate = dayjs(filters.to).endOf('day');

      updatedData = updatedData.filter(item => {
        const date = dayjs(item[dateField]);
        return date.isBetween(fromDate, toDate, null, '[]');
      });

      // Sort the filtered data by the selected date field
      updatedData.sort((a, b) => {
        return dayjs(a[dateField]).diff(dayjs(b[dateField]));
      });
    }

    setFilteredData(updatedData);
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleTableBtn = (mortgageNumber) => {
    window.location.href = `/dview/${mortgageNumber}`;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  function formatCamelCaseString(inputString) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
  }

  useTheme();

  return (
    <div className="w-full h-fit p-5">
      <div className="flex flex-col h-full gap-2">
        <span className='labels text-xl font-semibold'>
          {allDocs ? t("dealsSearch.AllDocs") : t("dealsSearch.PipelineDeals")}
        </span>
        {!loading ? (
          <div className="rounded-md h-full border-2 p-5 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className='labels'>
                  {Object.keys(data[0] || {}).map((key) => (
                    <th key={key} className={`labels border p-2 text-${subdomain}`}>
                      {key === "Mortgage" ? t(`dealsSearch.Mortgage #`) : formatCamelCaseString(t(`dealsSearch.${key}`))}
                    </th>
                  ))}
                  <th className={`labels border p-2 text-${subdomain}`}>{t('Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.entries(row).map(([key, cell], cellIndex) => (
                      <td key={cellIndex} className="border p-2">
                        {key === 'Mortgage' ? (
                          <span
                            onClick={() => handleTableBtn(cell)}
                            className="text-center p-2 rounded-full cursor-pointer hover:bg-zinc-200 border-b-black bg-zinc-100"
                          >
                            {cell}
                          </span>
                        ) : (
                          <span>{cell}</span>
                        )}
                      </td>
                    ))}
                    <td className="border px-5 w-full h-full p-2 flex gap-2 items-center justify-around" data-tooltip-content="Document Upload Button" data-tooltip-id="uploadTooltip">
                      <Button accountID={row.Mortgage} variant="docUpload" />
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
                    currentPage === pageNumber ? `bg-${subdomain} text-white` : 'bg-white text-black'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Tooltip id="uploadTooltip" place="bottom" effect="solid" />
    </div>
  );
}

PipelineDeals.propTypes = {
  searchData: PropTypes.object,
  allDocs: PropTypes.bool,
};

export default PipelineDeals;