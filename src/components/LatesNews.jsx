import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function LatestNews({ newsData }) {
  const { t } = useTranslation();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [newsData]);

  return (
    <div id="latesNewsWrapper" className="w-full h-fit flex items-center">
      <span
        className="h-full w-1/3 md:w-1/6 p-5"
        id="latestNewsSection"
      >
        {t('latestNews.title')}
      </span>
      <p className='w-full h-full p-5 bg-white flex items-center'>{newsData[currentNewsIndex]?.news}</p>
    </div>
  );
}

LatestNews.propTypes = {
  newsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      news: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LatestNews;
