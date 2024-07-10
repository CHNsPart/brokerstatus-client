import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const cancelToken = axios.CancelToken.source();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios(url, options, {cancelToken: cancelToken.token});
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log(axios.isCancel(error))
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    return () => {
        cancelToken.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error, loading, refetch: fetchData };
};


export default useAxios;
