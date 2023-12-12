import axios from 'axios';

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((result) => result.data);

export default fetcher;
