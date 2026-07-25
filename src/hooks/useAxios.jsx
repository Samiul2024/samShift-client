import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://samshift-server-ukum.onrender.com`
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;