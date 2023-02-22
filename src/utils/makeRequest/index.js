import axios from 'axios';
import { BACKEND_URL } from '../../constants/apiEndPoints';

const makeRequest = async (apiEndPoint, dynamicConfig) => {
  const requestDetails = {
    method: apiEndPoint.method,
    url: `${BACKEND_URL}/${apiEndPoint.url}`,
    ...dynamicConfig,
  };
  const { data } = await axios(requestDetails);
  return data;
};

export default makeRequest;
